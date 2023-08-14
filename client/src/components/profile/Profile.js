import React, { useEffect, useState } from 'react'
import Post from '../post/Post'
import './Profile.scss'
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../createPost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/slices/postsSlice'
import { followAndUnfollowUser } from '../../redux/slices/FeedSlice'
import dummyImg from '../../assets/user.png'

function Profile() {
    const navigate = useNavigate();

    const params = useParams();
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);
    const feedData = useSelector(state => state.feedDataReducer.feedData);
    const userProfile = useSelector(state => state.postsReducer.userProfile);
    const disPatch = useDispatch();
    const [isMyProfile, setisMyProfile] = useState('');
    const [isFollowing, setIsFollowing] = useState('');

    useEffect(() => {

        disPatch(getUserProfile({
            userId: params.userId,
        }))

        setisMyProfile(myProfile?._id === params.userId);
        setIsFollowing(feedData?.followings?.find((item) => item._id === params.userId));

    }, [disPatch, myProfile, params.userId, feedData]);

    function handleUserFollow() {

        disPatch(followAndUnfollowUser({
            userIdToFollow: params.userId
        }))

    }

    return (
        <div className='Profile'>
            <div className="container">
                <div className="left-side">
                    {isMyProfile && <CreatePost />}
                    {userProfile?.posts?.map(post => <Post key={post._id} post={post} />)}
                </div>
                <div className="right-side">
                    <div className="profile-card">
                        <img className="user-img" src={userProfile?.avatar?.url || dummyImg} alt='' />
                        <div className="user-name">{`${userProfile?.name}`}</div>
                        <p className='user-bio'>{userProfile?.bio}</p>
                        <div className="follower-info">
                            <h4>{`${userProfile?.followers?.length} followers`}</h4>
                            <h4>{`${userProfile?.followings?.length} followings`}</h4>
                        </div>
                        {!isMyProfile &&
                            <h5 onClick={handleUserFollow} className={isFollowing ? 'hover-link following-bg follow' : 'hover-link follow follow-link'}>
                                {isFollowing ? "Following" : "Follow"}
                            </h5>}
                        {isMyProfile && <button className='update-profile btn-secondary' onClick={() => { navigate('/updateProfile') }}>Update Profile</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile