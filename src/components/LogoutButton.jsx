import { useContext, useState } from 'react';

import Loading from './Loading/Loading';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/fontawesome-free-solid';



const StyledIcon = styled(FontAwesomeIcon)`
 color: ${props => props.theme.colors.primary};
 font-size: 1.8em;
 padding: .5em;
 cursor: pointer;

 &:hover {
    color: ${props => props.theme.colors.accent};
 }
`;

const LogoutButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    
    

    const cleanupDeletedTweets = async () => {
        // Delete tweets that are soft deleted?
    };

    const handleLogout = async () => {
        // setIsLoading(true);
        localStorage.clear();
        window.location.reload()
        // setIsLoading(false);
    };


  return (
    <>
      {isLoading ? (
        <Loading />
      ) : ( 
      <StyledIcon 
        icon={faSignOutAlt} 
        onClick={handleLogout}/>
      )}
    </>
  )
}

export default LogoutButton