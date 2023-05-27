
import './App.css'
import {BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import {  Start } from '../pages/start'
import { Registration } from '../pages/registration'
import { Login } from '../pages/login'
import { Home } from '../pages/home'
import { useEffect, useState } from 'react';
import { auth } from './config'
import { NavBar } from '../components/navbar'
import { Courses } from '../pages/courses'
import { Profile } from '../pages/profile'
import { CreateLesson } from '../components/createLesson'
import { LessonDetails } from '../components/lessonDetails'
import { NotFound } from '../pages/noFound'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
    {/* <Header/> */}
    <div className="App">
        <Routes>
          {/* <Route path='/' element={<Start/>} /> */}
          
          {/* <Route  path='/home' element={<Home/> }/> */}
         {!isAuthenticated ? (
            <Route path='/' element={<Start/>} />
          ) : (
            <Route path='/' element={<Home />} />
          )}

          <Route path='/sign-up' element={<Registration/>}/>
          <Route path='/sign-in' element={<Login/>}/>
          <Route path='/courses' element={<Courses/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/create' element={<CreateLesson/>}/>
          <Route path='/lessons/:id' element={<LessonDetails/>}/>
          <Route path='*' element={<NotFound/>}/>



        </Routes>
    </div>
    {isAuthenticated && <NavBar />}
    {/* <Footer/> */}
    
  </Router>
  )
}

export default App
