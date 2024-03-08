import React, { useRef, useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../../authContext/apiCalls.js';
import Loader from '../../component/loader/Loader';
import { AuthContext } from '../../authContext/AuthContext.js';
import { useContext } from 'react';


const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(AuthContext); // Get dispatch function from context

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // Basic validation
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            setError(null);
            setLoading(true);
            // Call login function from AuthAction
            await login({ email, password }, dispatch); // Pass email and password as userCredentials
            // If successful, alert and navigate to "/"
            alert("Login successful!");
            navigate('/');
        } catch (error) {
            console.log(error.message);
            alert(error.message); // Alert the error message
            // If unsuccessful, alert the error
            alert("Login failed. Please check your credentials and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login'>
            <div className='top'>
                <div className='wrapper'>
                    <img
                        className='logo'
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Dfnefr.png/120px-Dfnefr.png'
                        alt=''
                    />
                </div>
            </div>
            <div className='container'>
                <form onSubmit={handleLogin}>
                    <h1>Sign In</h1>
                    <input type='email' placeholder='Email or Phone Number' ref={emailRef} />
                    <input type='password' placeholder='Password' ref={passwordRef} />
                    <button className='loginButton' type='submit' disabled={loading}>
                        {loading ? <Loader /> : "Sign In"} {/* Use Loader component when loading */}
                    </button>
                    <span>New to Netflix? <b>Sign up now.</b></span>

                    {error && <span className="error">{error}</span>}
                </form>
            </div>
        </div>
    );
};

export default Login;
