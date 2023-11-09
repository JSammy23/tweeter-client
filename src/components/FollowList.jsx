import UserInfoCard from './UserInfoCard';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { Header } from '../styles/styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';


const StyledIcon = styled(FontAwesomeIcon)`
 cursor: pointer;
 color: inherit;
 font-size: 1.4em;
 margin: .3em 0;

 &:hover {
  color: ${props => props.theme.colors.primary};
 }
`;

const FollowList = ({ user, followers, following, listType }) => {
  const navigate = useNavigate();

  let userList = [];

  if (listType === 'followers') {
    userList = followers;
  } else if (listType === 'following') {
    userList = following;
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
        <Header>
          <h2>{user.fullName}</h2>
          <h2>{user.username}</h2>
          <StyledIcon icon={faArrowLeft} onClick={handleBackClick} />
        </Header>
        {userList.map(user => (
        <UserInfoCard key={user._id} user={user} />
      ))}
    </div>
  )
}

export default FollowList