
import { useState } from 'react'
import '../style/login.css'
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../src/config';
import {  useNavigate } from 'react-router-dom';


export const Registration =() =>{
   
        const navigate = useNavigate();
     
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('');
     
        const onSubmit = async (e) => {
          e.preventDefault()
         
          await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
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


    return <div className="Login">
       
        <div className="right-container">
            <div className="box">
                <p className='title'>Регистрация</p>
                <form action="">
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
                        <button className='button'>Войти</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}

