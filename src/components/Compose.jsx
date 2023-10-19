import { useState } from 'react';

import { TweetCard } from '../styles/tweetStyles';
import { Button } from '../styles/styledComponents';
import styled from 'styled-components';
import { composeTweet } from '../api/tweets';

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

const Compose = () => {
    const [editorState, setEditorState] = useState('');

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
        {/* User profile pic */}
        <ComposeBody>
            <StyledTextArea
            maxLength='500'
            placeholder="What's Happening?"
            rows="5"
            value={editorState}
            onChange={handleInputChange} />
            <Controls>
                <Button onClick={handleComposeTweet}>Tweet</Button>
            </Controls>
        </ComposeBody>
        
    </TweetCard>
  )
}

export default Compose;