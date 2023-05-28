
import { useState } from 'react'
import '../style/login.css'
import {  createUserWithEmailAndPassword, updateProfile  } from 'firebase/auth';
import { auth } from '../src/config';
import {  useNavigate } from 'react-router-dom';


export const Registration =() =>{
   
        const navigate = useNavigate();
     
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('');
        const [name, setName] = useState('')
        


     
        const onSubmit = async (e) => {
          e.preventDefault()
         
          await createUserWithEmailAndPassword(auth, email, password, { displayName: name })
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name,
                  })
                    .then(() => {
                      console.log('Display name set successfully.');
                    })
                    .catch((error) => {
                      console.error('Error setting display name:', error);
                    });
                console.log(user);
                navigate("/sign-in")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });
        }
        const toSignIn = ()=>{
            navigate('/sign-in')
        }


    return <div className="Login">
       
        <div className="right-container">
            <div className="box">
                <p className='title'>Регистрация</p>
                <form action="">
                <div className="name-box">
                        <p className='placeholder'>Name</p>
                        <input type="text" className='inputs' placeholder='Введите имя' value={name} onChange={(e)=>setName(e.target.value)} required/>
                    </div>

                    <div className="email-box">
                        <p className='placeholder'>E-mail</p>
                        <input type="email" className='inputs' placeholder='Введите e-mail' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>
                    <div className="password-box">
                        <p className='placeholder'>Password</p>
                        <input type="password" className='inputs' placeholder='Введите пароль' value={password} onChange ={(e)=>setPassword(e.target.value)}required/>
                        <div className='remember-me'>
                            <input type='checkbox' className='checkbox'/>
                            <p>Запомнить меня</p>
                        </div>
                    </div>
                    <div className="sign-in-box">
                        <button className='button' onClick={onSubmit}>Зарегистрироваться</button>
                        
                        <div className="forgot-password">
                            <hr style={{width: '360px',border:'1px solid #5C5959'}} />
                        </div>
                    </div>
                    <div className="sign-up-box">
                        <p>Уже есть аккаунт?</p>
                        <button className='button' onClick={toSignIn}>Войти</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}

