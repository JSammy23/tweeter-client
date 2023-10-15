import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api';
import Loading from '../../components/Loading/Loading';


import styled from 'styled-components';
import { Background } from 'styles/styledComponents';
import 'pages/LoginPage/LoginPage.Styles.css';

/**** TO-DO *******/
// Correct form for backend user
// Connect API calls for creating user

const SignUpPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();


    const handleSignUp = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        
        if (password !== confirmPassword) {
            setError("Passwords don't match.");
            setIsLoading(false);
            return;
        }

        try {
            const credentials = {
                firstName: firstName,
                lastName: lastName,
                username: userName,
                password: password,
                confirm_password: confirmPassword,
                email: email
            }

            const newUser = await createUser(credentials);
            // Navigate to succees screen, timed till login.
        } catch (error) {
            console.error('Failed to create user:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
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
            <form onSubmit={handleSignUp}>
                <div>
                    <div className="user-box">
                        <input type="text" name='firstName' id='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} onBlur={handleInputChange} onFocus={handleInputChange} />
                        <label htmlFor="firstName" >First Name</label>
                    </div>
                    <div className="user-box">
                        <input type="text" name='lastName' id='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} onBlur={handleInputChange} onFocus={handleInputChange} />
                        <label htmlFor="lastName" >Last Name</label>
                    </div>
                    <div className="user-box">
                        <input type="text" name='userName' id='userName' value={userName} onChange={(e) => setUserName(e.target.value)} onBlur={handleInputChange} onFocus={handleInputChange} />
                        <label htmlFor="userName" >UserName</label>
                    </div>
                    <div className="user-box">
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleInputChange} onFocus={handleInputChange} />
                        <label htmlFor="email" >Email</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handleInputChange} onFocus={handleInputChange} />
                        <label htmlFor="password" >Password</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name='confirmPassword' id='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onBlur={handleInputChange} onFocus={handleInputChange} />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                </div>
                <div className="sign-up-controls">
                    <button className="login-button" type="submit">Sign Up</button>
                </div>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
        {isLoading && (
            <Loading />
        )}
    </Background>
  )
}

export default SignUpPage

