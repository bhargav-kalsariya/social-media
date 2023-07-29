import React from 'react'
import './Login.scss'

function Login() {
    return (
        <div className='login'>
            <div className='login-box'>
                <h2 className='heading'>Login</h2>
                <form>
                    <label htmlFor="email">Email</label>
                    <input type="email" className="email" id="email" />

                    <label htmlFor="password">Password</label>
                    <input type="password" className="password" id="password" />

                    <input type="submit" className="submit" id="" />
                </form>
                <p>Do not have account? Signup</p>
            </div>
        </div>
    )
}

export default Login