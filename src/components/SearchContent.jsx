import { useState, useEffect } from 'react';
import Tweet from './Tweet';
import { useLocation } from 'react-router-dom';
import UserInfoCard from './UserInfoCard';


import styled from 'styled-components';
import { fetchSearchResults } from '../api';
import StandardTweet from './StandardTweet';

const SearchInput = styled.input`
  width: 95%; // Adjust width as needed
  padding: 10px; 
  margin-bottom: 10px;
  margin-top: 10px;
  border: 2px solid ${props => props.theme.colors.primary}; 
  border-radius: 7px; 
  font-size: 1.2em; 
  color: ${props => props.theme.colors.accent};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary}; // Highlight on focus
    box-shadow: 0 0 5px ${props => props.theme.colors.primary}; // Add glow effect
  }

  &::placeholder {
    color: ${props => props.theme.colors.accent}; // Placeholder text color
  }
`;

const StyledButton = styled.button`
  padding: 10px 15px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: ${props => props.theme.colors.accent}; // Slightly darker on hover
  }
`;

/*      ******** TO DO *********
 1. Set URL params on search so after clicking a result history works.
 2. For longer results save position for backclicking to load at the same spot.
*/



const SearchContent = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const location = useLocation();
    
    const handleSearch = async () => {
        try {
            const data = await fetchSearchResults(searchTerm);
            setResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('q');
        if (query) {
            setSearchTerm(query);
            fetchSearchResults(query).then(setResults).catch(error => {
              console.error('Error fetching search results:', error);
            });
        }
    }, [location]);

    const renderResults = () => {
      if (!results) {
        return <p>No results found.</p>
      } 
      return (
        <div>
          {results.tweets && results.tweets.length > 0 && (
            <div>
              <h3>Tweets</h3>
              {results.tweets.map(tweet => (
                <StandardTweet key={tweet._id} tweet={tweet} />
              ))}
            </div>
          )}

          {results.mentions && results.mentions.length > 0 && (
            <div>
              <h3>Mentions</h3>
              {results.mentions.map((mention, index) => (
                <StandardTweet key={index} tweet={mention} />
              ))}
            </div>
          )}

          {results.users && (
            <div>
              <h3>Users</h3>
              {results.users.map(user => (
                <UserInfoCard key={user._id} user={user} />
              ))}
            </div>
          )}
        </div>
      )
    };

  return (
    <>
      <div className='flex column align' >
        <SearchInput 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search with @ for users or mentions, and # for hashtags"
        />
        <StyledButton onClick={handleSearch}>Search</StyledButton>
      </div>
      {renderResults()}
    </>
  );
};

export default SearchContent;