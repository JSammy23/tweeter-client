import Compose from './Compose';
import TweetFetcher from './TweetFetcher';
import { fetchExploreTweets } from '../api/tweets';

const ExploreContent = () => {
  return (
    <>
        <Compose action='tweet' />
        <TweetFetcher fetchDataFunction={fetchExploreTweets} showType='exploreTweets' />
    </>
  )
}

export default ExploreContent