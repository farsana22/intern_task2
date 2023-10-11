import axios from 'axios';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const BASE_URL = "https://www.mulearn.org/api/v1/mulearn-task/"

    const Token = localStorage.getItem('accessToken')
    useEffect(() => {
        if (Token) {
            navigate('/');
        }
    }, [])

    const handleLogin = () => {
        setLoading(true)
        axios.post(BASE_URL + 'login/', {
            username,
            password
        }).then((res) => {
            setLoading(false)
            localStorage.setItem('accessToken', res?.data?.access);
            localStorage.setItem('refreshToken', res?.data?.refresh);
            navigate('/');
        }).catch((err: any) => {
            setLoading(false)
            toast.error(err.response.data.detail)
        })
    };



    return (
        <>
            <div className="App">
                <div className="container">
                </div>
                <div className="loginWrap">

                    <div className="loginItem">
                        <h4 className="loginTitle">Login</h4>
                        <input value={username} type="text" className="loginInput" placeholder='Username' onChange={(e) => {
                            e.preventDefault();
                            setUsername(e.target.value);
                        }} />
                        <input value={password} type="password" className="loginInput" placeholder='Password' onChange={(e) => {
                            e.preventDefault();
                            setPassword(e.target.value);
                        }} />
                        <button disabled={loading} className="loginBtn" onClick={(e) => {
                            e.preventDefault();
                            if (username == "") {
                                toast.error("Please enter username")
                            } else if (password === "") {
                                toast.error("Please enter password")
                            } else {
                                handleLogin();
                            }
                        }}>{loading ? <PropagateLoader size={10} color="#FFF" /> : "Login"}</button>
                        <span className="nav">Have'nt signed yet! <span className='navHigh' onClick={() => {
                            navigate('/signin')
                        }}>Signin</span></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login