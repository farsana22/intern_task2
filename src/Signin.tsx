import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const BASE_URL = "https://www.mulearn.org/api/v1/mulearn-task/"

    const handleSignup = () => {
        setLoading(true)
        axios.post(BASE_URL + 'register/', {
            username,
            password
        }).then((res) => {
            setLoading(false);
            toast.success(res.data.message);
            navigate('/login');
        }).catch((err) => {
            setLoading(false)
            err.response.data.username.map((msg: any) => (
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
                            if (username == "") {
                                toast.error("Please enter username")
                            } else if (password === "") {
                                toast.error("Please enter password")
                            } else {
                                handleSignup();
                            }
                        }}>{loading ? <PropagateLoader size={10} color="#FFF" /> : "Sign-up"}</button>
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