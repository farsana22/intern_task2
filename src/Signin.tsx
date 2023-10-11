import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignup = () => {
        const user = { username, password };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isUserLoggedIn', JSON.stringify(false));
        toast.success("Signup Successfull!")
        toast.success("Please Login to continue.")
        navigate('/login')
        setPassword("")
        setUsername("")
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