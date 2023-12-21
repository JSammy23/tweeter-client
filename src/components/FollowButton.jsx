import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { followUser } from '../api/users';

import styled from 'styled-components';
import { Button } from '../styles/styledComponents';
import { faCheck } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Checkmark = styled.span`
 position: relative;
 margin-left: .3em;
`;

const FollowButton = ({ user }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const currentUser = useSelector(state => state.user.currentUser);
  
    useEffect(() => {
      checkIsFollowing();
    }, [currentUser, user]);
  
    const checkIsFollowing = () => {
      const isFollowing = currentUser.following.some((followingUser) => followingUser === user);
      setIsFollowing(isFollowing);
    };

    const handleFollow = async () => {
      if (isFollowing) {
        try {
          setIsFollowing(false);
          await followUser(user);
        } catch (error) {
          console.error('Error unfollowing user', error);
        }
      } else {
        try {
          setIsFollowing(true);
          await followUser(user);
        } catch (error) {
          console.error('Error following user', error);
        }
      }
    };

    const renderFollowButton = () => {
        if (isFollowing) {
            return (
                <Button onClick={handleFollow} >
                    Following
                    <Checkmark>
                        <FontAwesomeIcon icon={faCheck} />
                    </Checkmark>
                </Button>
            )
        } else {
            return (
                <Button onClick={handleFollow}>
                    Follow
                </Button>
            )
        }
    }

  return (
    <>
        {renderFollowButton()}
    </>
  )
}

export default FollowButton;

