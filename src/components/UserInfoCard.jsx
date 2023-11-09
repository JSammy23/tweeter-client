import FollowButton from './FollowButton';
import { useHandleProfileClick } from '../hooks/useHandleProfileClick';

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

const UserInfoCard = ({ user }) => {
  const handleUserProfileClick = useHandleProfileClick();

  return (
    <UserCard>
      <UserImage src={user?.profile.profile_picture} onClick={() => handleUserProfileClick(user._id)} />
      <div className='flex column' >
        <Name>{user?.fullName}</Name>
        <Handle onClick={() => handleUserProfileClick(user._id)}>{user?.username}</Handle>
      </div>
      <Container>
        <FollowButton user={user._id} />
      </Container>
    </UserCard>
  )
}

export default UserInfoCard