import { Link, useNavigate} from 'react-router-dom'
import '../style/navbar.css'
import { signOut } from 'firebase/auth';
import { auth } from '../src/config';
// need to fix navlink, navlink to link
export const NavBar =()=>{
  const navigate = useNavigate();
  const signOutUser =async() =>{
    await signOut(auth);
    navigate('/');
}
    return <nav
    style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'white',
      zIndex: 9999,
      borderRadius: '10px'
    }}
  >
    <ul style={{ display: 'flex', justifyContent: 'space-around' }}>
      <li className='nav-el'>
        <Link to='/'><img src="icons\navbar-elements\home.svg" alt="Home" className="icon" /></Link>  
      </li>
      <li className='nav-el'>
      <Link to='/courses'><img src="icons\navbar-elements\courses.svg" alt="Courses" className="icon" /></Link>

          
      </li>
      <li className='nav-el'>
        <Link to='/profile'>
          <img src="icons\navbar-elements\profile.svg" alt="Profile" className="icon" />
        </Link> 
      </li>
      <li className='nav-el'>
        <Link to='/create'>
          <img src="icons\navbar-elements\add-button.svg" alt="create" className="icon" height='30px' />
          {/* Create Lesson */}
        </Link> 
      </li>
      <li className='nav-el'>
          {/* <img src="icons\navbar-elements\profile.svg" alt="Profile" className="icon" /> */}
          <button onClick={signOutUser}>sign out</button> 
      </li>
  
    </ul>
  
  </nav>
}
