import { useState } from 'react';

import styled from 'styled-components';
import { Button, Module } from '../../styles/styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/fontawesome-free-regular';
import './EditProfile.styles.css';



const Header = styled.div`
 display: flex;
 justify-content: space-between;
 width: 100%;
 color: ${props => props.theme.colors.primary};
 font-size: 1.7em;
`;

const IconBtn = styled.button`
 background-color: transparent;
 border: none;
 outline: none;
 color: ${props => props.theme.colors.primary};
 font-size: 1em;
 margin-right: .3em;
 cursor: pointer;

 &:hover {
    color: ${props => props.theme.colors.accent};
 }
`;



const EditProfile = ({ toggleClose, user, onUpdateUser, updateUserProfileImg, setLocalUsername, localUsername, setLocalFirstName, setLocalLastName, localFirstName, localLastName }) => {

    const [profileImg, setProfileImg] = useState(user.profile.profile_picture);
    const [error, setError] = useState('');
    

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

        
    //     // if (user.username !== localUsername) {
    //     //     // Create function to check username avalibilty
    //     //     const handleAvailable = await checkUserHandleAvailability(localHandle);
    //     //     if (!handleAvailable) {
    //     //         setError('User handle is already taken!');
    //     //         return;
    //     //     }
    //     // }
    
    //     // Update user api call
    //     const updatedUser = {
    //       ...user,
    //       username: localusername,
    //       firs: localHandle,
    //       profileImg,
    //     };
    
    //     onUpdateUser(updatedUser);
    //     updateUserProfileImg(profileImg);

    //     // Deteremine how/if to cache user
    //     const cachedUser = localStorage.getItem(user.uid);
    //     if (cachedUser) {
    //         const parsedUser = JSON.parse(cachedUser);
    //         parsedUser.displayName = localDisplayName;
    //         parsedUser.userHandle = localHandle;
    //         parsedUser.profileImg = profileImg;
    //         localStorage.setItem(user.uid, JSON.stringify(parsedUser)); 
    //     } else {
    //         localStorage.setItem(user.uid, JSON.stringify(updatedUser));
    //     };
    // };

    const handleInputChange = (e) => {
        if (e.target.value !== '') {
            e.target.parentElement.classList.add('has-value');
        } else {
            e.target.parentElement.classList.remove('has-value');
        }
    };

    // const handleProfileImgChange = async (e) => {
    //     const file = e.target.files[0];
      
    //     const storageRef = ref(storage, `users/${user.uid}/profile-img/${file.name}`);
      
    //     try {
    //       const snapshot = await uploadBytes(storageRef, file);
    //       const downloadURL = await getDownloadURL(snapshot.ref);
    //       console.log('Profile image uploaded successfully:', downloadURL);
    //       setProfileImg(downloadURL);
    //     } catch (error) {
    //       console.error('Error uploading profile image:', error);
    //     };
    // };

    const openFileInput = () => {
        const fileInput = document.getElementById('profileImgInput');
        fileInput.click();
    };

    

    
  return (
    <Module>
        <Header>
            <div className='flex align'>
                <IconBtn onClick={toggleClose} ><FontAwesomeIcon icon={faTimesCircle} /></IconBtn>
                <p>Edit Profile</p>
            </div>
            <Button form='editProfile' type='submit' fontSize='.6em' >Save</Button>
        </Header>
        <form id='editProfile'  > {/* Add back <= onSubmit={handleSubmit} */}
            <div className="profile-img-cont">
                <img onClick={openFileInput} className='profile-pic' src={profileImg} alt='profile pic' />
                <div onClick={openFileInput} className="edit-label">Edit</div>
                <input 
                type="file"
                id='profileImgInput'
                accept='image/*'
                //onChange={handleProfileImgChange}
                style={{ display: 'none' }}
                 />
            </div>
            <div className='float-label has-value' >
                <input type="text" name='username' id='username' required  onChange={(e) => setLocalUsername(e.target.value)} onBlur={handleInputChange} onFocus={handleInputChange} value={localUsername}/>
                <label htmlFor="username">Username</label>
            </div>
            <div className='float-label has-value' >
                <input type="text" name='firstName' id='firstName' required onChange={(e) => setLocalFirstName(e.target.value)} onBlur={handleInputChange} onFocus={handleInputChange} value={localFirstName} />
                <label htmlFor="firstName">First Name</label>
            </div>
            <div className='float-label has-value' >
                <input type="text" name='lastName' id='lastName' required onChange={(e) => setLocalLastName(e.target.value)} onBlur={handleInputChange} onFocus={handleInputChange} value={localLastName} />
                <label htmlFor="lastName">Last Name</label>
            </div>
            {error && <div className='error'>{error}</div>}
        </form>
    </Module>
  )
}

export default EditProfile