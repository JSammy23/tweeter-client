import styled from 'styled-components';

/*****  Styling  *****/
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

const TextArea = ({placeholder, editorState, handleInputChange}) => {
  return (
    <div>
        <StyledTextArea
            maxLength='500'
            placeholder={placeholder}
            rows="5"
            value={editorState}
            onChange={handleInputChange} />
    </div>
  )
}

export default TextArea;