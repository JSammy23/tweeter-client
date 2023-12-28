import styled from "styled-components"


export const Background = styled.div`
background-color: ${props => props.theme.colors.bgVeryDark};
width: 100vw;
height: 100vh;
`;

 export const Header = styled.div`
 background-color: rgba(0, 0, 0, .6);
 color: ${props => props.theme.colors.accent};
 width: 100%;
 height: 5.6em;
 padding: .3em;
`;

export const Logo = styled.h1`
 color: ${props => props.theme.colors.primary};
 font-size: 2em;
 padding: .5em 0;
 
 @media (max-width: 683px) {
     display: none;
 }
`;

export const Wrapper = styled.div`
 width: 95%;
 display: flex;
 justify-content: center;
 background-color: transparent;
 margin-right: auto;
 margin-left: auto;
 
 @media (max-width: 683px) {
     width: 100%;
     height: 100%;
 }
`;

export const Title = styled.h2`
 color: ${props => props.theme.colors.primary};
 font-weight: bold;
 margin-left: .6em;
`;

export const UserHandle = styled.h3`
 color: ${props => props.theme.colors.secondary};
 margin-left: .7em;
`;

export const Button = styled.button`
 background-color: ${props => props.theme.colors.primary};
 font-size: ${props => props.fontSize || '1em'};
 font-weight: bold;
 padding: .5em;
 margin: .7em;
 border-radius: 10px;
 border: none;
 outline: none;
 cursor: pointer;

 &:hover {
     background-color: ${props => props.theme.colors.accent};
 }

 &:disabled {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};
 }
`;

export const Module = styled.div`
 position: absolute;
 top: 30%;
 left: 50%;
 width: min(100vw, 683px);
 transform: translate(-50%, -50%);
 box-shadow: 0 15px 25px rgba(0,0,0,.6);
 border-radius: 10px;
 padding: 2em;
 z-index: 999;
 background-color: ${props => props.theme.colors.bgVeryDark};

 @media (max-width: 400px) {
    padding: 1.3em;
 }
`;

export const EmptyFeedContainer = styled.div`
 color: lime;
 display: flex;
 flex-direction: column;
 align-items: center;
 padding: 2em;
`;

export const TextButton = styled.span`
 color: inherit;
 margin: 0 .3em;
 text-decoration: underline;
 cursor: pointer;

 &:hover {
    color: ${props => props.theme.colors.primary};
 }
`;

export const NotificationControls = styled.div`
 font-size: 1.2em;
 display: flex;
 justify-content: space-between;
`;

