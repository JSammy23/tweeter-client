import { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading/Loading';
import { UserContext } from '../../services/userContext';
import { fetchCurrentUser } from '../../api';

import styled from 'styled-components';
import { Background, Wrapper } from '../../styles/styledComponents';




const Flex = styled.div`
  display: flex;
  
  @media (max-width: 683px) {
    flex-direction: column;
  }
`;

const FeedContainer = styled.div`
 width: 100%;
 height: 100vh;
 max-width: 683px;
 /* grid-column: 2 / 3; */
 flex: 3;
 flex-shrink: 1;
 order: 1;
 overflow-y: scroll;
 border-right: 1px solid;
 border-left: 1px solid;
 border-color: ${props => props.theme.colors.secondary};

 @media (min-width: 838px) {
  min-width: 683px;
 }

 @media (max-width: 683px) {
  padding-bottom: 3.5em;
  width: 100vw;
  overflow-y: auto;
 }

 @media (min-width: 683px) and (max-width: 838px) {
    /* flex-shrink: 0; */
    min-width: 600px;
  }

 /* Hide the scrollbar */
 &::-webkit-scrollbar {
    width: 0em;
    background-color: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  /* Hide the scrollbar in Mozilla Firefox */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  /* Track */
  scrollbar-track-color: transparent;

  /* Handle */
  scrollbar-thumb-color: transparent;
`;

const FeedPage = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const setCurrentUserAsync = async () => {
      setLoading(true);
      try {
        const user = await fetchCurrentUser();
        setCurrentUser(user)
      } catch (error) {
        console.error("Failed to fetch current user", error);
      }
      setLoading(false)
    }
    setCurrentUserAsync()
  }, [setCurrentUser]);

  if (loading) {
    return <Loading/>
  }
  
  return (
    <Background>
      <Wrapper>
        <Flex>
        <Sidebar/>
        <FeedContainer>{children}</FeedContainer>
        </Flex>
      </Wrapper>
    </Background>
  )
}

export default FeedPage