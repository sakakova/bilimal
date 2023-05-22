import {NavLink} from 'react-router-dom'

// need to fix navlink, navlink to link
export const NavBar =()=>{
    return <nav
    style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'green',
      zIndex: 9999,
    }}
  >
    <ul style={{ display: 'flex', justifyContent: 'space-around' }}>
      <li>
        <NavLink to='/' className='nav-el' />
        
         </li>
      <li>
        <NavLink to="/start"className='nav-el'/>
          
      </li>
      <li>
        <NavLink to="/sign-in"className='nav-el'/>

          
      </li>
    </ul>
  </nav>
}