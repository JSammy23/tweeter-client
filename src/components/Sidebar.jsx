import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Logo } from '../styles/styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/fontawesome-free-brands';
import { faHome, faHashtag, faUser, faSearch, faBell } from '@fortawesome/fontawesome-free-solid';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton';



const Header = styled.header`
 background-color: ${props => props.theme.colors.bgVeryDark};
 display: flex;
 flex-direction: column;
 height: 100vh;
 justify-content: space-between;
 /* flex: 1; */
 margin-right: 1em;

 @media (max-width: 683px) {
    height: auto;
    width: 100%;
    order: 2;
    flex-direction: row;
    align-items: center;
    padding: 0.5em 1em;
    position: fixed;
    bottom: 0;
    left: 0;
    justify-content: center;
    background-color: rgba(0, 0, 0, .8);
 }
`;

const NavContainer = styled.div`
 display: flex;
 flex-direction: column;
    @media (max-width: 683px) {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 80%;
    }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    gap: .7em;
    flex-direction: column;
    list-style: none;
 }

 @media (max-width: 683px) {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    ul {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0;
    }
    li {
        margin-right: 0.5em;
        margin-bottom: 0;
    }
    }
`;

const StyledNavLink = styled(NavLink)`
 color: ${props => props.theme.colors.primary};
 margin-bottom: .5em;
 font-size: 2em;
 cursor: pointer; 
 text-decoration: none;

 &:hover {
     color: ${props => props.theme.colors.accent};
 } 
 &.active {
     color: ${props => props.theme.colors.accent};
 } 
 span {
     margin-left: .3em;
 } 
 @media (max-width: 868px) {
     span {
         display: none;
     }
 }
`;

const UserControls = styled.div`
 margin: 1em 0;

 @media (max-width: 683px) {
    margin: 0 0.5em;
    display: none;
 }
`;

const Sidebar = () => {

    const currentUser = useSelector(state => state.user.currentUser);

    const navItems = [
        {id: 'home', icon: faHome, text: 'Home', route: '/home'},
        {id: 'explore', icon: faHashtag, text: 'Explore', route: '/explore'},
        {id: 'search', icon: faSearch, text: 'Search', route: '/search'},
        {id: 'notifications', icon: faBell, text: 'Notifications', route: '/notifications'},
        currentUser && {id: 'profile', icon: faUser, text: 'Profile', route: `/profile/${currentUser._id}`},
        
    ].filter(Boolean);

  return (
    <Header>
        <NavContainer>
            <Logo><FontAwesomeIcon icon={faTwitter} aria-hidden="true" /></Logo>
            <Nav>
                <ul>
                    {navItems.map((item) => (
                        <li key={item.id} >
                            <StyledNavLink
                                to={item.route}
                                activeClassName='active'>
                                    <FontAwesomeIcon icon={item.icon} aria-hidden="true" />
                                    <span>{item.text}</span>
                            </StyledNavLink>
                        </li>
                    ))}
                </ul>
            </Nav>
        </NavContainer>
        <UserControls>
            <LogoutButton />
        </UserControls>
    </Header>
  )
}

export default Sidebar