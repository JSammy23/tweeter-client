import { Routes, Route, useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import FollowList from "./FollowList";
import useUserInfo from "../hooks/useUserInfo";
import Loading from "./Loading/Loading";
import { useGetUserTweetsAndLikesQuery } from "../api";


const ProfileContent = () => {
    const { userId } = useParams();
    const { userInfo } = useUserInfo({
      userId: userId,
      populate: 'following:firstName lastName username profile.profile_picture,followers:firstName lastName username profile'
    });
    const { data: tweets, isLoading, isError } = useGetUserTweetsAndLikesQuery({ userId, limit: 75, skip: 0 });

    // Combine userTweets and userRetweets
    const combinedTweets = tweets?.userTweets && tweets?.userRetweets 
                           ? [...tweets.userTweets, ...tweets.userRetweets]
                           : [];
    
    if (isLoading) {
      return <Loading />;
    }

  return (
    <Routes>
        <Route path="/" element={<UserProfile user={userInfo} tweets={combinedTweets} />} />
        <Route path="followers" element={<FollowList user={userInfo} listType='followers' followers={userInfo?.followers} />} />
        <Route path="following" element={<FollowList user={userInfo} listType='following' following={userInfo?.following} />} />
        <Route path="likes" element={<UserProfile user={userInfo} tweets={tweets.userLikes} />} />
    </Routes>
  )
}

export default ProfileContent;