import '../style/profile.css'
import { useEffect, useState } from 'react';
import { auth } from '../src/config';


export const Profile = () => {
    const [userName, setUserName] = useState('');
  
    useEffect(() => {
      const fetchUserData = async () => {
        const user = auth.currentUser;
        if (user) {
          try {
            await user.reload(); // Refresh user data
            const updatedUser = auth.currentUser; // Get the updated user object
            const displayName = updatedUser.displayName;
            console.log(displayName);
            setUserName(displayName);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      };
  
      fetchUserData();
    }, []);
  
    return (
      <div className="Profile">
        <h1>Profile</h1>
        <h2>Welcome, {userName || 'Loading...'}!</h2>
      </div>
    );
  };