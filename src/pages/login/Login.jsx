import React, { useRef, useState } from 'react'
import './login.css'

const Login = () => {
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
          <form>
            <h1>Sign In</h1>
            <input type='email' placeholder='Email or Phone Number'/>
            <input type='password' placeholder='Password'/>
            <button className='loginButton'>Sign In</button>
            <span>New to Netflix? <b>Sign up now.</b></span>
            <small>
                This page is protected by the Google reCAPTHA to ensure you're not a
                bot. <b>Learn more</b>
            </small>
          </form>
        </div>
    </div>
  )
}

export default Login;