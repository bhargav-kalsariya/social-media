import React, { useEffect, useState } from 'react'
import Avatar from '../avatar/Avatar'
import "./Follower.scss"
import { useDispatch, useSelector } from 'react-redux';
import { followAndUnfollowUser } from '../../redux/slices/FeedSlice';
import { useNavigate } from 'react-router-dom';

function Follower({ user }) {

    const navigate = useNavigate();
    const disPatch = useDispatch();
    const feedData = useSelector(state => state.feedDataReducer.feedData);
    const [isFollowing, setIsFollowing] = useState();

    useEffect(() => {

        setIsFollowing(feedData.followings.find(item => item._id === user._id));

    }, [feedData, user._id]);

    function handleUserFollow() {

        disPatch(followAndUnfollowUser({
            userIdToFollow: user._id
        }))

    }

    return (
        <div className='Follower'>
            <div className="user-info hover-link" onClick={() => navigate(`/profile/${user?._id}`)}>
                <Avatar src={user?.avatar?.url} />
                <h4 className="name">{user?.name}</h4>
            </div>
            <h5 onClick={handleUserFollow} className={isFollowing ? ' following-bg' : ' follow-link'}>
                {isFollowing ? "Following" : "Follow"}
            </h5>
        </div>
    )
}

export default Follower