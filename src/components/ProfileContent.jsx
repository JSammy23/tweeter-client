import { Routes, Route, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import FollowList from "./FollowList";
import useUserInfo from "../hooks/useUserInfo";
import Loading from "./Loading/Loading";
import { fetchUserTweetsAndLikes } from "../api/tweets";

const ProfileContent = () => {
    const { userId } = useParams();
    const { userInfo, loading } = useUserInfo({
      userId: userId,
      populate: 'following:firstName lastName username profile.profile_picture,followers:firstName lastName username profile'
    });
    const [tweetData, setTweetData] = useState({
      userTweets: [],
      userLikes: []
    });

    useEffect(() => {
      const fetchUserTweets = async () => {
        try {
          const data = await fetchUserTweetsAndLikes(userId);
          setTweetData({ userTweets: data.tweets, userLikes: data.likes })
        } catch (error) {
          console.error('Error fetching user tweets:', error);
        }
      };
      fetchUserTweets();
    }, [userId]);
    
    if (loading) {
        return <Loading />;
    }

  return (
    <Routes>
        <Route path="/" element={<UserProfile user={userInfo} tweetData={tweetData} />} />
        <Route path="followers" element={<FollowList user={userInfo} listType='followers' followers={userInfo?.followers} />} />
        <Route path="following" element={<FollowList user={userInfo} listType='following' following={userInfo?.following} />} />
        <Route path="likes" element={<UserProfile user={userInfo} showLikes={true} />} />
    </Routes>
  )
}

export default ProfileContent