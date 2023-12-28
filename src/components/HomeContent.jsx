import { useGetHomeTweetsQuery } from '../api/tweets';
import Compose from './Compose';
import TweetList from './TweetList';
import { useState } from 'react';

import styled from 'styled-components';


const HomeContent = () => {
  const [skip, setSkip] = useState(0);
  const { data: tweets, isLoading, isError } = useGetHomeTweetsQuery({ limit: 50, skip: skip });
  
  const handleLoadMore = () => {
    const newSkip = skip + 50;
    setSkip(newSkip);
  };

  return (
    <>
      <Compose action='tweet' />
      {isLoading ? <p>Loading...</p> : isError ? <p>Error Loading Tweets</p> : <TweetList tweets={tweets} />}
    </>
  )
}

export default HomeContent;