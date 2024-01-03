import { useState, forwardRef } from 'react';
import { composeTweet, useUploadTweetImagesMutation } from '../api/tweets';
import { useSelector } from 'react-redux';
import TextArea from './TextArea';
import TweetAttachments from './TweetAttachments';
import ImagePreview from './ImagePreview';

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
    justify-content: space-between;
`;

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

/****** Component ******/
const Compose = ({ action, isReply, activeThread, addReply }) => {
    const [editorState, setEditorState] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const currentUser = useSelector(state => state.user.currentUser);
    const placeholder = action === 'tweet' ? "What's Happening?" : "Tweet your reply!";
    const [snackOpen, setSnackOpen] = useState(false);
    const [alertType, setAlertType] = useState('success');
    const [uploadTweetImages] = useUploadTweetImagesMutation();

    const handleInputChange = (e) => {
        setEditorState(e.target.value);
    };

    const handleSelectedImages = (images) => {
        setSelectedImages(images);
    };

    const removeImage = (index) => {
        setSelectedImages(selectedImages.filter((_, idx) => idx !== index));
    };

    const handleComposeTweet = async () => {
        let imageUrls = [];

        if (selectedImages.length > 0) {
            const formData = new FormData();
            selectedImages.forEach((file) => formData.append('images', file));

            try {
                // Upload images and get URL
                const uploadResult = await uploadTweetImages(formData).unwrap();
                imageUrls = uploadResult.fileUrls;
            } catch (error) {
                console.error('Error uploading images:', error);
                setAlertType('error');
                setSnackOpen(true);
                return;
            }
        }

        const body = {
            text: editorState,
            ...(imageUrls.length > 0 && { 
                attachments: imageUrls.map(url => ({ url, type: 'image' })) 
            })
        };

        try {
            const newTweet = await composeTweet(body);
            console.log('Tweet composed successfully!', body); // Console log body
            setEditorState('');
            setSelectedImages([]);
            setAlertType('success'); 
            setSnackOpen(true);
        } catch (error) {
            console.error('Error composing tweet:', error);
            setAlertType('error'); 
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
            setAlertType('success'); 
            setSnackOpen(true);
        } catch (error) {
            console.error('Error composing reply:', error);
            setAlertType('error'); 
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
            <TextArea placeholder={placeholder} editorState={editorState} handleInputChange={handleInputChange} />
            <Controls>
                {/* Tweet Attachment Componet here */}
                <TweetAttachments onImagesSelected={handleSelectedImages} selectedImages={selectedImages} />
                <Button 
                    onClick={isReply ? handleComposeReply : handleComposeTweet}
                    disabled={editorState.trim().length < 2}>
                        Tweet
                </Button>
            </Controls>
            {/* Display image previews */}
            {selectedImages.map((file, index) => (
              <ImagePreview 
              key={index} 
              src={URL.createObjectURL(file)} 
              alt={file.name} 
              onDelete={() => removeImage(index)} 
              />
            ))}
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