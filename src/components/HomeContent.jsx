import { useGetHomeTweetsQuery } from '../api/tweets';
import Compose from './Compose';
import TweetList from './TweetList';

import styled from 'styled-components';


const HomeContent = () => {
    const { data: tweets, isLoading, isError } = useGetHomeTweetsQuery({ limit: 50, skip: 0 });

  return (
    <>
      <Compose action='tweet' />
      {isLoading ? <p>Loading...</p> : isError ? <p>Error Loading Tweets</p> : <TweetList tweets={tweets} />}
    </>
  )
}

export default HomeContent