import React, { useRef, useState, useEffect } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const serverURL = process.env.SERVER_URL || 'http://localhost:5000';
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();

    useEffect(() => {
        if (email && password && username) {
            handleUsernameSubmit();
        }
    }, [email, password, username]); // Run only when email, password, or username changes

    const handleStart = () => {
        setEmail(emailRef.current.value);
    };

    const handleUsernameSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            
            const response = await axios.post(`${serverURL}/api/auth/register`, {
                email: email,
                password: password,
                username: usernameRef.current.value
            });
            navigate('/login');
            console.log(response.data);
        } catch (error) {
            setError(error.response.data.message);
        }
    };
    

    return (
        <div className='register'>
            <div className='top'>
                <div className='wrapper'>
                    <img 
                        className='logo' 
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Dfnefr.png/120px-Dfnefr.png' 
                        alt=''
                    />
                    <button className='loginButton'>Sign In</button>
                </div>
            </div>
            <div className='container'>
                <h1>Unlimited movies</h1>
                <h2>watch anywhere</h2>
                <p>Ready to watch</p>
                {!email ? (
                    <form className='input'>
                        <input type='email' placeholder='email address' ref={emailRef}/>
                        <button className='registerButton' onClick={handleStart}>Get started</button>
                    </form>
                ) : (
                    <form className='input'>
                        <input type='password' placeholder='Password' ref={passwordRef}/>
                        <input type='text' placeholder='Username' ref={usernameRef}/>
                        <button className='registerButton' onClick={(e) => handleUsernameSubmit(e)}>Start</button>
                    </form>
                )}
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    );
};

export default Register;
