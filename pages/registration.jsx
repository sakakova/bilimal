
// export const Registration = () =>{
//     return <div className="Registration">

//     </div>
// }

import '../style/login.css'
export const Registration =() =>{
    return <div className="Login">
       
        <div className="right-container">
            <div className="box">
                <p className='title'>Регистрация</p>
                <form action="">
                    <div className="email-box">
                        <p className='placeholder'>E-mail</p>
                        <input type="text" className='inputs' placeholder='Введите e-mail'/>
                    </div>
                    <div className="password-box">
                        <p className='placeholder'>Password</p>
                        <input type="text" className='inputs' placeholder='Введите пароль'/>
                        <div className='remember-me'>
                            <input type='checkbox' className='checkbox'/>
                            <p>Запомнить меня</p>
                        </div>
                    </div>
                    <div className="sign-in-box">
                        <button className='button'>Зарегистрироваться</button>
                        
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