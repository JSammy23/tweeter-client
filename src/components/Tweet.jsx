import StandardTweet from './StandardTweet';



import styled from 'styled-components';


// TODO:
// 1. Assess tweet type ie. isReply, isQoute?
// 2. Return the appropiate tweet component and pass the tweet object prop

const Tweet = ({ tweet }) => {
    
  if (tweet.replyTo === null) {
    return <StandardTweet tweet={tweet} />
  } else {
    return null;
    // ReplyTweet
  }

  

};

export default Tweet