import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipientChips from './RecipientChips';

import { Title, Header, Button } from '../styles/styledComponents';
import { SearchInput } from './SearchContent';



const NewMessage = () => {
    const [recipients, setRecipients] = useState([]);

    const location = useLocation();
    
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

  return (
    <div className='flex column align'>
        <Header>
            <div className="flex spacer align">
                <Title>New message</Title>
                <Button>Next</Button>
            </div>
        </Header>
        <SearchInput
            type='text'
            placeholder='Search people' />
        <RecipientChips recipients={recipients} onRemoveRecipient={handleRemoveRecipient} />
    </div>
  )
};

export default NewMessage;
