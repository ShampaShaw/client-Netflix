import React, { useRef, useState } from 'react'
import './register.css'

const Register = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const emailRef = useRef()
    const passwordRef = useRef()

    const handleStart = () => {
        setEmail(emailRef.current.value)
    }
    const handleFinish = () => {
        setPassword(passwordRef.current.value)
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
                    <input type='password' placeholder='Password' ref={passwordRef}/>
                    <button className='registerButton' onClick={handleFinish}>Start</button>
                </form>
            )}
        </div>
    </div>
  )
}

export default Register