import React from 'react'
import './UpdateProfile.scss';
import userImg from '../../assets/user.png';

function UpdateProfile() {
    return (
        <div className='UpdateProfile'>
            <div className="container">
                <div className="left-side">
                    <img src={userImg} alt="" className='user-img' />
                </div>
                <div className="right-side">
                    <form action="">
                        <input type="text" placeholder='Your Name' />
                        <input type="text" placeholder='Your Bio' />
                        <input type="submit" className='btn-primary' />
                    </form>
                    <input type="submit" className='btn-primary delete-account' value='Delete Account' />
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile