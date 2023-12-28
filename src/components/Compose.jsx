import { useState, forwardRef } from 'react';
import { composeTweet } from '../api/tweets';
import { useSelector } from 'react-redux';

import { TweetCard, UserImage } from '../styles/tweetStyles';
import { Button } from '../styles/styledComponents';
import styled from 'styled-components';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


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

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

/****** Component ******/
const Compose = ({ action, isReply, activeThread, addReply }) => {
    const [editorState, setEditorState] = useState('');
    const currentUser = useSelector(state => state.user.currentUser);
    const placeholder = action === 'tweet' ? "What's Happening?" : "Tweet your reply!";
    const [snackOpen, setSnackOpen] = useState(false);

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
            setSnackOpen(true);
        } catch (error) {
            console.error('Error composing tweet:', error)
        }
    };

    const handleComposeReply = async () => {
        const body = {
            text: editorState,
            replyTo: activeThread._id,
            thread: activeThread.thread === null ? activeThread._id : activeThread.thread
        }
        try {
            const newReply = await composeTweet(body);
            console.log('reply composed sucessfully!');
            setEditorState('')
            addReply(newReply);
            setSnackOpen(true);
        } catch (error) {
            console.error('Error composing reply:', error);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackOpen(false);
    };


  return (
    <TweetCard>
        <ImgDiv>
            <UserImage src={currentUser?.profile.profile_picture} />
        </ImgDiv>
        <ComposeBody>
            <StyledTextArea
            maxLength='500'
            placeholder={placeholder}
            rows="5"
            value={editorState}
            onChange={handleInputChange} />
            <Controls>
                <Button 
                    onClick={isReply ? handleComposeReply : handleComposeTweet}
                    disabled={editorState.trim().length < 2}>
                        Tweet
                </Button>
            </Controls>
        </ComposeBody>
        <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleClose} >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Tweet Sent!
          </Alert>  
        </Snackbar>
    </TweetCard>
  )
}

export default Compose;