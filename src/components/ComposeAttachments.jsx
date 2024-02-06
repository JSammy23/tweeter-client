import { useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import Compressor from 'compressorjs';

import styled from 'styled-components';

const StyledIconButton = styled(IconButton)`
 && {
    color: ${props => props.theme.colors.secondary};
 }

 &:hover {
    color: ${props => props.theme.colors.primary};
 }
`;


const ComposeAttachments = ({ onImagesSelected, selectedImages }) => {

    const openFileInput = () => {
        const fileInput = document.getElementById('imageAttachmentInput');
        fileInput.click();
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const compressedImages = [];

        files.forEach(file => {
            new Compressor(file, {
                quality: 0.6,
                success: (compressedResult) => {
                    compressedImages.push(compressedResult);
                    if (compressedImages.length === files.length) {
                        // Call the callback function when all images are compressed
                        onImagesSelected(compressedImages);
                    }
                },
                error: (err) => {
                    console.error('Compression error:', err.message);
                },
            });
        });
    };

  return (
    <div>
        <StyledIconButton onClick={openFileInput} aria-label="Attach image" >
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

export default ComposeAttachments;