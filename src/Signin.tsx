import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const BASE_URL = "https://www.mulearn.org/api/v1/mulearn-task/"

    const handleSignup = () => {
        axios.post(BASE_URL + 'register/', {
            username,
            password
        }).then((res) => {
            toast.success(res.data.message);
            navigate('/login');
        }).catch((err) => {
            err.response.data.username.map((msg:any)=>(
                toast.error(msg)
            ))
        })
    };
    return (
        <>
            <div className="App">
                <div className="container">
                </div>
                <div className="loginWrap">

                    <div className="loginItem">
                        <h4 className="loginTitle">Signin</h4>
                        <input value={username} type="text" className="loginInput" placeholder='Username' onChange={(e) => {
                            e.preventDefault();
                            setUsername(e.target.value);
                        }} />
                        <input value={password} type="password" className="loginInput" placeholder='Password' onChange={(e) => {
                            e.preventDefault();
                            setPassword(e.target.value);
                        }} />
                        <button className="loginBtn" onClick={(e) => {
                            e.preventDefault();
                            handleSignup();
                        }}>Login</button>
                        <span className="nav">Already have an account ? <span className='navHigh' onClick={() => {
                            navigate('/login')
                        }}>Login</span></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin