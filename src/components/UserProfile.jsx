import { useContext, useEffect, useState } from 'react';
import EditProfile from './Edit Profile/EditProfile';
import FollowButton from './FollowButton';
import UserProfileControls from './UserProfileControls';
import FollowList from './FollowList';
import { UserContext } from '../services/userContext';

import styled from 'styled-components';
import { Title, UserHandle, Button } from 'styles/styledComponents';
import { Link, useRoutes } from 'react-router-dom';


const ProfileCard = styled.div`
 width: 100%;
 height: auto;
 border-top: 1px solid;
 border-bottom: 1px solid;
 border-color: ${props => props.theme.colors.secondary};
`;

const UserImage = styled.img`
 width: 8em;
 height: 8em;
 border: 2px solid black;
 border-radius: 50%;
 margin: .7em;

 @media (max-width: 599px) {
    width: 7em;
    height: 7em;
 }
`;

const CountsDiv = styled.div`
 color: ${props => props.theme.colors.secondary};
 margin-left: .7em;
 margin-top: .3em;

 span {
    color: ${props => props.theme.colors.primary};
    margin: 0 .3em;
    cursor: pointer;
 }
`;

const StyledLink = styled(Link)`
 color: ${props => props.theme.colors.secondary};
 background-color: transparent;
 border: none;
 outline: none;
 cursor: pointer;
 font-size: 1em; 
 text-decoration: none;

 &:hover {
     color: ${props => props.theme.colors.primary};
     text-decoration: underline;
 }
`;


const UserProfile = ({ user }) => {

    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [localUsername, setLocalUsername] = useState('');
    const [userProfileImg, setUserProfileImg] = useState('');
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        if (currentUser._id === user._id) {
            setIsCurrentUser(true);
        } else {
            setIsCurrentUser(false);
        }
        if (localUsername !== user.displayName) {
            setLocalUsername(user.displayName);
        }
        if (userProfileImg !== user.profileImg) {
            setUserProfileImg(user.profileImg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, currentUser]);

    // const match = useRoutes([
    //     {
    //         path: 'following',
    //         element: <FollowList listType='following' following={user?.following} user={user} />
    //     },
    //     {
    //         path: 'followers',
    //         element: <FollowList listType='followers' followers={user?.followers} user={user} />
    //     },
    // ]);

    const toggleEditProfile = () => {
        setEditProfile(!editProfile);
    };
    
    const handleUpdateUser = async (updatedUser) => {
        // Update user in DB
        setEditProfile(false);
    };

  return (
    <>
        <ProfileCard>
            <div className="flex spacer">
                <div>
                    <UserImage src={userProfileImg} />
                </div>
                <div>
                {isCurrentUser ? (
                    <Button onClick={toggleEditProfile} >Edit profile</Button>
                ) : (
                    <FollowButton user={user?._id} />
                )}
                </div>
            </div>
            <div className="flex column">
                <Title>{localUsername}</Title> {/* Change to user first or full name */}
                <UserHandle>{localUsername}</UserHandle>
                <CountsDiv>
                    <StyledLink to={`/profile/${user._id}/following`} >
                        <span>{user?.following.length}</span>Following
                    </StyledLink>
                    <StyledLink to={`/profile/${user._id}/followers`} >
                        <span>{user?.followers.length}</span>Followers
                    </StyledLink>
                </CountsDiv>
                <UserProfileControls userUid={user._id} />
            </div>
            {editProfile && (
            <EditProfile onUpdateUser={handleUpdateUser} 
            toggleClose={toggleEditProfile}
            user={user}
            setLocalUsername={setLocalUsername}
            localUsername={localUsername}
            updateUserProfileImg={setUserProfileImg} />)}
        </ProfileCard>
        {/* <TweetFetcher fetchDataFunction={() => fetchUserTweetsAndLikes(userInfo.uid)} showLikes={showLikes} showType='userTweets' /> */}
    </>
  );
};

export default UserProfile