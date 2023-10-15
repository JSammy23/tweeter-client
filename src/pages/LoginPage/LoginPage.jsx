import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api";

import './LoginPage.Styles.css'; 
import styled from "styled-components";  
import { Background } from 'styles/styledComponents';


// TODO:
// 1. Handle Forgotten Password

const LoginPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const credentials = {
                username,
                password
            }
            await loginUser(credentials);
            // Naviagte to feedpage
        } catch (error) {
            console.error('Failed to create user:', error);
            setError(error.message);
        }
    };

    const handleInputChange = (e) => {
        if (e.target.value !== '') {
            e.target.parentElement.classList.add('has-value');
        } else {
            e.target.parentElement.classList.remove('has-value');
        }
    };

  return (
    <Background>
        <div className="login-box">
            <form onSubmit={handleLogin}>
                <div className="user-box">
                    <input type="username" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} onBlur={handleInputChange} onFocus={handleInputChange} />
                    <label htmlFor="username" >Username</label>
                </div>
                <div className="user-box">
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handleInputChange} onFocus={handleInputChange} />
                    <label htmlFor="password" >Password</label>
                </div>
                <div className="info">
                    <p>Don't have an account? Click sign up below.</p>
                </div>
                <div className="controls">
                    <button className="login-button" type="submit">Log In</button>
                    <Link to='/signup' className="sign-up-button" >Sign Up</Link>
                </div>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    </Background>
  )
}

export default LoginPage