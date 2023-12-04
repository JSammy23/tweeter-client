import TweeterBird from '../assets/TweetBird.png';
import styled from 'styled-components';
import { EmptyFeedContainer } from '../styles/styledComponents';


const EmptyFeed = () => {
  return (
    <EmptyFeedContainer>
        <h2>No tweets to display. Start following people to see their tweets!</h2>
        <img src={TweeterBird} alt="Empty Feed" width='125px' />
    </EmptyFeedContainer>
  )
}

export default EmptyFeed