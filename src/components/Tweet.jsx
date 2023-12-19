import ReplyTweet from './ReplyTweet';
import StandardTweet from './StandardTweet';
import MissingTweet from './MissingTweet';

import styled from 'styled-components';

// TODO:
// 1. Assess tweet type ie. isReply, isQoute?
// 2. Return the appropiate tweet component and pass the tweet object prop

const Tweet = ({ tweet }) => {
  // Handle deleted tweets
  if (tweet.isDeleted) {
    // console.log('Missing Tweet determined by Tweet Component!');
    return <MissingTweet />;
  }

  // Handle replies
  if (tweet.replyTo !== null) {
    // console.log('Reply Tweet determined by Tweet Component!');
    return <ReplyTweet initialTweet={tweet} />;
  }

  // Default to rendering a standard tweet
  // console.log('Standard Tweet determined by Tweet Component!');
  return <StandardTweet tweet={tweet} />;
};

export default Tweet;