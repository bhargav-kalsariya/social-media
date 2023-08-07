import React, { useEffect, useState } from 'react'
import Post from '../post/Post'
import './Profile.scss'
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../createPost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/slices/postsSlice'

function Profile() {
    const navigate = useNavigate();

    const params = useParams();
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);
    const userProfile = useSelector(state => state.postsReducer.userProfile);
    const disPatch = useDispatch();
    const [isMyProfile, setisMyProfile] = useState('');

    useEffect(() => {

        disPatch(getUserProfile({
            userId: params.userId,
        }))

        setisMyProfile(myProfile?._id === params.userId);

    }, [myProfile]);

    return (
        <div className='Profile'>
            <div className="container">
                <div className="left-side">
                    <CreatePost />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
                <div className="right-side">
                    <div className="profile-card">
                        <img className="user-img" src={userProfile?.avatar?.url} alt="" />
                        <div className="user-name">{`${userProfile?.name}`}</div>
                        <div className="follower-info">
                            <h4>{`${userProfile?.followers.length} followers`}</h4>
                            <h4>{`${userProfile?.followings.length} followings`}</h4>
                        </div>
                        {!myProfile && <button className="follow btn-primary">Follow</button>}
                        {myProfile && <button className='update-profile btn-secondary' onClick={() => { navigate('/updateProfile') }}>Update Profile</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile