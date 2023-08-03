import React, { useRef, useState } from 'react'
import './Navbar.scss';
import Avatar from '../avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import { useSelector } from 'react-redux';
function Navbar() {

    const navigate = useNavigate();
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);

    function handleLogoutClicked() {

    }

    return (
        <div className='navbar'>
            <div className="container">
                <h2 className="banner hover-link" onClick={() => navigate('/')}>Social media</h2>
                <div className="right-side">
                    <div className="profile hover-link" onClick={() => navigate(`/profile/${myProfile?._id}`)}>
                        <Avatar />
                    </div>
                    <div className="logout hover-link" onClick={handleLogoutClicked}>
                        <AiOutlineLogout />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar