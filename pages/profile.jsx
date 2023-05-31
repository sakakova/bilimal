import '../style/profile.css'
import { useEffect, useState } from 'react';
import { auth } from '../src/config';
import { db } from '../src/config';
import {   uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';


export const Profile = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('')
    const [profileImage, setProfileImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    useEffect(() => {
      const fetchUserData = async () => {
        const user = auth.currentUser;
        if (user) {
          try {
            await user.reload(); // Refresh user data
            const updatedUser = auth.currentUser; // Get the updated user object
            const displayName = updatedUser.displayName;
            const email = updatedUser.email;
            console.log(displayName);
            setUserName(displayName);
            setUserEmail(email);

            if (updatedUser.photoURL) {
              setProfileImage(updatedUser.photoURL);
            }

          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      };
      
  
      fetchUserData();
    }, []);
    // useEffect(() => {
    //   const storedProfileImage = localStorage.getItem('profileImage');
    //   if (storedProfileImage && auth.currentUser.photoURL) {
    //     setProfileImage(storedProfileImage);
    //   }
    // }, []);
    const updateProfileImage = async (downloadURL) => {
      setProfileImage(downloadURL);
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, { photoURL: downloadURL });
      }
        };


    const handleFileUpload = async (file) => {
      try {
        setUploading(true);
        const userId = auth.currentUser.uid; // Get the user's unique identifier

        const imagePath = `profile-images/${userId}_${file.name}`;
        const imageRef = ref(db, imagePath);
        await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(imageRef);
  
        updateProfileImage(downloadURL);
       
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setUploading(false);
    }
  };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        handleFileUpload(file);
      }
    };
  

  
    return (
      <div className="Profile">
          <h1>Профиль</h1>
          {profileImage ? (
          <div className='profile-photo-box'>
            <img src={profileImage} alt="Profile" style={{maxHeight:'250px', maxWidth:'250px'}} />
          </div>
        ) : (
          <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {uploading && <p>Загрузка...</p>}
          </div>
        )}
          <h2><i>{userName || 'Загрузка...'}</i></h2>
          <br/>
          <p className='Email' style={{fontSize:'18px', alignSelf: 'flex-start', paddingLeft:'20px', fontFamily: 'sans-serif', marginBottom:'0'}}> Email:</p>
          <p style={{fontSize: '',marginTop: '0', alignSelf:'flex-start',paddingLeft:'20px' }}>{userEmail}</p>
        </div>
    );
  };