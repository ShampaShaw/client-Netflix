import React, { useRef, useState } from 'react'
import './register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [username,setUsername] = useState("")
    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()
    const usernameRef = useRef()


    const handleStart = () => {
        setEmail(emailRef.current.value)
    }
    const handleFinish = async (e) => {
        e.preventDefault()
        setPassword(passwordRef.current.value)
        setUsername(usernameRef.current.value)
        try{
            await axios.post("auth/register", {email,username,password});
            navigate('/login')
        }catch(err){
            
        }
    }
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
                <div className='input'>
                    <input type='email' placeholder='email address' ref={emailRef}/>
                    <button className='registerButton' onClick={handleStart}>Get started</button>
                </div>
            ) : (
                <form className='input'>
                    <input type="username" placeholder="username" ref={usernameRef} />
                    <input type='password' placeholder='Password' ref={passwordRef}/>
                    <button className='registerButton' onClick={handleFinish}>Start</button>
                </form>
            )}
        </div>
    </div>
  )
}

export default Register