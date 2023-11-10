import { useContext, useState } from 'react';
import { composeTweet } from '../api/tweets';
import { UserContext } from '../services/userContext';

import { TweetCard, UserImage } from '../styles/tweetStyles';
import { Button } from '../styles/styledComponents';
import styled from 'styled-components';


/*****  Styling  *****/
const ImgDiv = styled.div`
 width: auto;
 height: 100%;
 margin-right: .5em;
 display: flex;
 align-items: flex-start;
`;

const StyledTextArea = styled.textarea`
    width: 100%;
    padding: .3em .5em;
    font-size: 1.3em;
    font-family: 'Times New Roman', Times, serif;
    border: none;
    background-color: ${props => props.theme.colors.bgVeryDark};
    color: #fff;
    outline: none;
    &::placeholder {
        color: ${props => props.theme.colors.secondary};
    }
`;

const ComposeBody = styled.div`
 display: flex;
 flex-direction: column;
 width: 100%;
 justify-content: flex-start;
 height: fit-content;
 /* border: 1px solid violet; */
`;

const Controls = styled.div`
    display: flex;
    justify-content: flex-end;
`

/****** Component ******/
const Compose = () => {
    const [editorState, setEditorState] = useState('');
    const { currentUser } = useContext(UserContext);

    const handleInputChange = (e) => {
        setEditorState(e.target.value);
    };

    const handleComposeTweet = async () => {
        const body = {
            text: editorState
        }
        try {
            const newTweet = await composeTweet(body);
            console.log('Tweet composed successfully!');
            setEditorState('');
        } catch (error) {
            console.error('Error composing tweet:', error)
        }
    };


  return (
    <TweetCard>
        <ImgDiv>
            <UserImage src={currentUser.profile.profile_picture} />
        </ImgDiv>
        <ComposeBody>
            <StyledTextArea
            maxLength='500'
            placeholder="What's Happening?"
            rows="5"
            value={editorState}
            onChange={handleInputChange} />
            <Controls>
                <Button 
                    onClick={handleComposeTweet}
                    disabled={editorState.trim().length < 2}>
                        Tweet
                </Button>
            </Controls>
        </ComposeBody>
        
    </TweetCard>
  )
}

export default Compose;