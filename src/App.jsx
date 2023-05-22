import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Home } from '../pages/home'
import { Registration } from '../pages/registration'


function App() {

  return (
    <Router>
    {/* <Header/> */}
    <div className="App">
        <Routes>
          
          <Route path='/' element={<Home/>} />
          <Route path='/sign-up' element={<Registration/>}/>
        </Routes>
    </div>
    {/* <Footer/> */}
    
  </Router>
  )
}

export default App
