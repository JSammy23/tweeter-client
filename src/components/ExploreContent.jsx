import Compose from './Compose';
import TweetList from './TweetList';
import { useGetExploreTweetsQuery } from '../api';
import { useState } from 'react';

const ExploreContent = () => {
  const [skip, setSkip] = useState(0);
  const { data: tweets, isLoading, isError } = useGetExploreTweetsQuery({ limit: 50, skip: skip });

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

export default ExploreContent;