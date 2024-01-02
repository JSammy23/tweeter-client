import { useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';

import styled from 'styled-components';

const StyledIconButton = styled(IconButton)`
 && {
    color: ${props => props.theme.colors.secondary};
 }

 &:hover {
    color: ${props => props.theme.colors.primary};
 }
`;


const TweetAttachments = ({ onImagesSelected, selectedImages }) => {

    const openFileInput = () => {
        const fileInput = document.getElementById('imageAttachmentInput');
        fileInput.click();
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files) {
            onImagesSelected([...Array.from(files)]);
        }
    };

  return (
    <div>
        <StyledIconButton onClick={openFileInput} >
            <ImageIcon />
        </StyledIconButton>
        <input
            id='imageAttachmentInput'
            type="file"
            multiple
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
        />
    </div>
  )
}

export default TweetAttachments;