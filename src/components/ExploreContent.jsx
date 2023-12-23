import Compose from './Compose';
import TweetList from './TweetList';
import { useGetExploreTweetsQuery } from '../api';

const ExploreContent = () => {
  const { data: tweets, isLoading, isError } = useGetExploreTweetsQuery({ limit: 50, skip: 0 });


  return (
    <>
        <Compose action='tweet' />
        {isLoading ? <p>Loading...</p> : isError ? <p>Error Loading Tweets</p> : <TweetList tweets={tweets} />}
    </>
  )
}

export default ExploreContent;