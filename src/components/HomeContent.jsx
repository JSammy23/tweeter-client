import { fetchHomeTweets } from '../api/tweets';
import Compose from './Compose';
import TweetFetcher from './TweetFetcher';

import styled from 'styled-components';


const HomeContent = () => {
    
  return (
    <>
      <Compose action='tweet' />
      <TweetFetcher fetchDataFunction={fetchHomeTweets} showType='subscribedTweets' />
    </>
  )
}

export default HomeContent