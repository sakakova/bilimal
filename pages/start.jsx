import '../style/start.css'
import { useNavigate } from 'react-router-dom'

export const Start =() => {
    const navigate = useNavigate();
    const StartSignUp = () =>{
        navigate('/sign-up')
    }
    return <div className="Start">
        <div className="logo-box">
            <div className="">
                <img src="icons\onoyku 1logo.svg" alt="logo" />
            </div>
            <p>Оңой окуу</p>
        </div>
        <div className="button-box">
            <button onClick={StartSignUp}>Старт</button>
        </div>
    </div>
}