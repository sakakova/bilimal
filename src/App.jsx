
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {  Start } from '../pages/start'
import { Registration } from '../pages/registration'
import { Login } from '../pages/login'
import { Home } from '../pages/home'


function App() {

  return (
    <Router>
    {/* <Header/> */}
    <div className="App">
        <Routes>
          
          <Route path='/' element={<Start/>} />
          <Route path='/sign-up' element={<Registration/>}/>
          <Route path='/sign-in' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>


        </Routes>
    </div>
    {/* <Footer/> */}
    
  </Router>
  )
}

export default App
