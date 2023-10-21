import { softDeleteTweet } from '../api/tweets';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';


const MenuButton = styled.button`
 color: ${props => props.theme.colors.secondary};
 width: 100%;
 height: auto;
 border: none;
 outline: none;
 font-size: 1em;
 background-color: transparent;
 cursor: pointer;
 
 &:hover {
    color: ${props => props.theme.colors.primary};
 }
`;

const StyledIcon = styled(FontAwesomeIcon)`
 margin-right: .3em;
`;

const DeleteTweetButton = ({ tweet }) => {
  
  const handleDeleteTweet = async () => {
    try {
      await softDeleteTweet(tweet._id);
    } catch (error) {
      console.error("Error deleting tweet:", error)
    }
  };

  return (
    <MenuButton onClick={handleDeleteTweet} >
        <StyledIcon icon={faTrash} />
        Delete
    </MenuButton>
  );
};

export default DeleteTweetButton