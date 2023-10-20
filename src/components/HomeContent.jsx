import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../services/userContext';
import { fetchHomeTweets } from '../api/tweets';
import Compose from './Compose';
import Tweet from './Tweet';


const HomeContent = () => {
    const { currentUser } = useContext(UserContext);
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchSubscribedTweets = async () => {
        setLoading(true);
        try {
          const homeTweets = await fetchHomeTweets();
          setTweets(homeTweets)
        } catch (error) {
          console.error("Failed to fetch home tweets");
        }
        setLoading(false);
      };
      fetchSubscribedTweets()
    }, []);

    const mapTweetsToComponents = () => {
      if (!tweets.length) {
          return;
      } else {
          return tweets.map((tweet) => <Tweet key={tweet._id} tweet={tweet} />);
      }
  };

    if (loading) {
      return <p>Loading...</p>
    }
  return (
    <>
      <Compose />
      {mapTweetsToComponents()}
    </>
  )
}

export default HomeContent