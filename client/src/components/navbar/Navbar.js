import React, { useRef, useState } from 'react'
import './Navbar.scss';
import Avatar from '../avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import LoadingBar from 'react-top-loading-bar'

function Navbar() {

    const navigate = useNavigate();
    const LoadingRef = useRef();

    const [Loading, setLoading] = useState(false);

    function toggleLoadingBar() {
        if (!Loading) {
            setLoading(true);
            LoadingRef.current.continuousStart();
        } else {
            setLoading(false);
            LoadingRef.current.complete();
        }
    }

    return (
        <div className='navbar'>
            <LoadingBar color='blue' ref={LoadingRef} />
            <div className="container">
                <h2 className="banner hover-link" onClick={() => navigate('/')}>Social media</h2>
                <div className="right-side">
                    <div className="profile hover-link" onClick={() => navigate('/profile/hrdgf')}>
                        <Avatar />
                    </div>
                    <div className="logout hover-link" onClick={toggleLoadingBar}>
                        <AiOutlineLogout />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar