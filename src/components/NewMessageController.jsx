import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RecipientChips from './RecipientChips';
import { useCreateConversationMutation, fetchUsersCommunity } from '../api';

import { Title, Header, Button } from '../styles/styledComponents';
import { SearchInput } from './SearchContent';



const NewMessageController = () => {
    const [recipients, setRecipients] = useState([]);
    const [ createConversation ] = useCreateConversationMutation();
    const location = useLocation();
    const navigate = useNavigate();
    const isDisabled = recipients.length > 0;
    
    useEffect(() => {
        const forwardedRecipientId = location.state?.recipientId;
        if (forwardedRecipientId) {
            setRecipients([forwardedRecipientId]);
            console.log('Recieved forwarded recipient Id:', forwardedRecipientId);
        }
    }, [location.state]);

    const handleRemoveRecipient = (id) => {
        setRecipients(recipients.filter(recipient => recipient.id !== id));
    };

    const handleNextClick = async () => {
        const participantIds = recipients.map(recipient => recipient._id);
        try {
            const response = await createConversation({participantIds}).unwrap();
            navigate(`/messages/${response._id}`);
        } catch (error) {
            console.error('Failed to create conversation:', error);
        }
    };

  return (
    <div className='flex column align'>
        <Header>
            <div className="flex spacer align">
                <Title>New message</Title>
                <Button 
                 onClick={handleNextClick}
                 disabled={!isDisabled}>
                    Next
                </Button>
            </div>
        </Header>
        <SearchInput
            type='text'
            placeholder='Search people' />
        <RecipientChips recipients={recipients} onRemoveRecipient={handleRemoveRecipient} />
    </div>
  )
};

export default NewMessageController;
