import { useContext, useEffect, useState } from 'react';
import EditProfile from './Edit Profile/EditProfile';
import FollowButton from './FollowButton';
// import UserProfileControls from './UserProfileControls';
// import FollowList from './FollowList';
import { UserContext } from '../services/userContext';

import styled from 'styled-components';
import { Title, UserHandle, Button } from '../styles/styledComponents';
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
    const [localFirstName, setLocalFirstName] = useState('');
    const [localLastName, setLocalLastName] = useState('');
    const [userProfileImg, setUserProfileImg] = useState('');
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        if (currentUser?._id === user?._id) {
            setIsCurrentUser(true);
        } else {
            setIsCurrentUser(false);
        }
        if (localUsername !== user?.username) {
            setLocalUsername(user?.username);
        }
        if (localFirstName !== user?.firstName) {
            setLocalFirstName(user?.firstName);
        }
        if (localLastName !== user?.lastName) {
            setLocalLastName(user?.lastName);
        }
        if (userProfileImg !== user?.profile.profile_picture) {
            setUserProfileImg(user?.profile.profile_picture);
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

    if (!user) {
        return null;
    }

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
                <Title>{localFirstName} {localLastName}</Title> {/* Change to user first or full name */}
                <UserHandle>{localUsername}</UserHandle>
                <CountsDiv>
                    <StyledLink to={`/profile/${user._id}/following`} >
                        <span>{user?.following.length}</span>Following
                    </StyledLink>
                    <StyledLink to={`/profile/${user._id}/followers`} >
                        <span>{user?.followers.length}</span>Followers
                    </StyledLink>
                </CountsDiv>
                {/* <UserProfileControls userUid={user._id} /> */}
            </div>
            {editProfile && (
            <EditProfile onUpdateUser={handleUpdateUser} 
            toggleClose={toggleEditProfile}
            user={user}
            setLocalUsername={setLocalUsername}
            localUsername={localUsername}
            localFirstName={localFirstName}
            setLocalFirstName={setLocalFirstName}
            localLastName={localLastName}
            setLocalLastName={setLocalLastName}
            updateUserProfileImg={setUserProfileImg} />)}
        </ProfileCard>
        {/* <TweetFetcher fetchDataFunction={() => fetchUserTweetsAndLikes(userInfo.uid)} showLikes={showLikes} showType='userTweets' /> */}
    </>
  );
};

export default UserProfile