import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../services/userContext';
import { fetchHomeTweets } from '../api/tweets';
import Compose from './Compose';
import Tweet from './Tweet';
import TweeterBird from '../assets/TweetBird.png';

import styled from 'styled-components';
import { EmptyFeed } from '../styles/styledComponents';

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
          return (
            <EmptyFeed className="empty-feed">
              <h2>No tweets to display. Start following people to see their tweets!</h2>
              <img src={TweeterBird} alt="Empty Feed" width='175px' />
            </EmptyFeed>
          );
      } else {
          return tweets.map((tweet) => <Tweet key={tweet._id} tweet={tweet} />);
      }
    };

    if (loading) {
      return <p>Loading...</p>
    }
  return (
    <>
      <Compose action='tweet' />
      {mapTweetsToComponents()}
    </>
  )
}

export default HomeContent