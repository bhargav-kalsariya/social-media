import React from 'react'
import { Link } from 'react-router-dom'
import './Signup.scss'

function Signup() {
    return (
        <div className='signup'>
            <div className='signup-box'>
                <h2 className='heading'>Login</h2>
                <form>
                    <label htmlFor="name">Name</label>
                    <input type="text" className="name" id="name" />

                    <label htmlFor="email">Email</label>
                    <input type="email" className="email" id="email" />

                    <label htmlFor="password">Password</label>
                    <input type="password" className="password" id="password" />

                    <input type="submit" className="submit" id="" />
                </form>
                <p className='subheading'>Already have an account?
                    <Link to='/login'>Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup