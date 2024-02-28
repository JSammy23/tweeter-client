import FollowButton from './FollowButton';
import { useHandleProfileClick } from '../hooks/useHandleProfileClick';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { UserImage, Name, Handle } from '../styles/tweetStyles';


const UserCard = styled.div`
 width: 100%;
 height: auto;
 padding: .3em;
 display: flex;
 border-bottom: 1px solid ${props => props.theme.colors.secondary};
`;

const Container = styled.div`
 margin-left: auto;
 width: 40%;
`;

const UserInfoCard = ({ user, showFollowButton = false, onCardClick, muteHandle = false }) => {
  const currentUser = useSelector(state => state.user.currentUser);
  const handleUserProfileClick = useHandleProfileClick();

  // Handler for clicking the card, if provided
  const cardClickHandler = () => {
    if (onCardClick) {
      onCardClick(user);
    }
  };

  return (
    <UserCard onClick={onCardClick ? cardClickHandler : undefined} style={{ cursor: onCardClick ? 'pointer' : 'default' }} >
      <UserImage src={user?.profile.profile_picture} onClick={() => handleUserProfileClick(user._id)} />
      <div className='flex column' >
        <Name>{user?.fullName}</Name>
        <Handle onClick={!muteHandle && (() => handleUserProfileClick(user._id))}>
          {user?.username}
        </Handle>
      </div>
      {showFollowButton && currentUser && user && currentUser._id !== user._id && (
        <Container>
          <FollowButton user={user._id} />
        </Container>
      )}
    </UserCard>
  )
};

export default UserInfoCard;