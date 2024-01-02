import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const PreviewContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 10px;
  width: max-content;

  &:hover .delete-button {
    visibility: visible;
  }
`;

const StyledImage = styled.img`
  width: 100px;
  height: auto;
  /* border: 2px solid red; */
`;

const DeleteButton = styled(IconButton)`
  position: absolute;
  top: -90px; // Adjust as needed
  right: 20px; // Adjust as needed
  visibility: hidden; // Hide by default
  background-color: red; // Optional: for better visibility
  border-radius: 50%;
  padding: 0;
  .MuiIconButton-label {
    color: #f00;
  }
`;

const ImagePreview = ({ src, alt, onDelete }) => {
  return (
    <PreviewContainer>
      <StyledImage src={src} alt={alt} />
      <DeleteButton onClick={onDelete} className="delete-button" size="small" variant='contained' >
        <CloseIcon color='error' />
      </DeleteButton>
    </PreviewContainer>
  );
};

export default ImagePreview;
