import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {
        const user = localStorage.getItem('user');
        if (user) {
            const storedUser = JSON.parse(user);
            if (username === storedUser.username && password === storedUser.password) {
                localStorage.setItem('isUserLoggedIn',JSON.stringify(true));
                toast.success('Login successful');
                navigate('/')
                setUsername("")
                setPassword("")
            } else {
                toast.error('Invalid credentials');
                setPassword("")
                setUsername("")
            }
        } else {
            toast.error('User not found');
            setPassword("")
            setUsername("")
        }
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
                        <button className="loginBtn" onClick={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}>Login</button>
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