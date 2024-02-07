import React from 'react';

import styled from 'styled-components';
import { Title, Header, Button } from '../styles/styledComponents';
import { SearchInput } from './SearchContent';



const NewMessage = () => {
  return (
    <div className='flex column align'>
        <Header>
            <div className="flex spacer align">
                <Title>New message</Title>
                <Button>Next</Button>
            </div>
        </Header>
        <SearchInput
            type='text'
            placeholder='Search people' />
    </div>
  )
};

export default NewMessage;
