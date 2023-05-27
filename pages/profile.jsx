import '../style/profile.css'
import { useEffect, useState } from 'react';
import { auth } from '../src/config';


export const Profile =()=>{
    const [userName, setUserName] = useState('');

    useEffect(() => {
      const user = auth.currentUser;
      if (user) {
        const displayName = user.displayName;
        console.log(displayName)
        setUserName(displayName);
      }
    }, []);
      return <div className="Profile">
          <h1>Profile</h1>
          <h2>Welcome, {userName}!</h2>

      </div>
}