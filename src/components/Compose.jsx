import { useState, forwardRef } from 'react';
import { composeTweet } from '../api/tweets';
import { useSelector } from 'react-redux';
import TextArea from './TextArea';

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
    const [alertType, setAlertType] = useState('success');

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
            setAlertType('success'); // Set alert type to success
            setSnackOpen(true);
        } catch (error) {
            console.error('Error composing tweet:', error);
            setAlertType('error'); // Set alert type to error
            setSnackOpen(true);
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
            console.log('Reply composed successfully!');
            setEditorState('');
            addReply(newReply);
            setAlertType('success'); // Set alert type to success
            setSnackOpen(true);
        } catch (error) {
            console.error('Error composing reply:', error);
            setAlertType('error'); // Set alert type to error
            setSnackOpen(true);
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
            {/* TextArea */}
            <TextArea placeholder={placeholder} editorState={editorState} handleInputChange={handleInputChange} />
            <Controls>
                <Button 
                    onClick={isReply ? handleComposeReply : handleComposeTweet}
                    disabled={editorState.trim().length < 2}>
                        Tweet
                </Button>
            </Controls>
        </ComposeBody>
        <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleClose}>
          {alertType === 'success' ? (
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Tweet Sent!
            </Alert>
          ) : (
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Tweet failed to send!
            </Alert>  
          )}
        </Snackbar>
    </TweetCard>
  )
}

export default Compose;