import { useState, useEffect } from 'react';
import Tweet from './Tweet';

import styled from 'styled-components';

const StyledInput = styled.input`
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
  font-size: 16px;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark}; // Slightly darker on hover
  }
`;


const SearchContent = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    
    const handleSearch = async () => {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        setResults(data);
    };

  return (
    <div className='flex column align' >
        <StyledInput 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search with @ for users or mentions, and # for hashtags"
        />
        <StyledButton onClick={handleSearch}>Search</StyledButton>
        {/* Render search results */}
    </div>
  );
};

export default SearchContent;