import React, { useEffect } from 'react'
import './Feed.scss';
import Post from '../post/Post';
import Follower from '../follwers/Follower';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedData } from '../../redux/slices/FeedSlice';

function Feed() {

    const disPatch = useDispatch();
    const feedData = useSelector(state => state.feedDataReducer.feedData);

    useEffect(() => {

        disPatch(getFeedData());

    }, [disPatch]);

    return (
        <div className='Feed'>
            <div className="container">
                <div className="left-side">
                    {feedData?.posts?.map(post => <Post key={post._id} post={post} />)}
                </div>
                <div className="right-side">
                    <div className="following">
                        <h3 className="title">You Are Following</h3>
                        {feedData?.followings?.map(user => <Follower key={user._id} user={user} />)}
                    </div>
                    <div className="suggestion">
                        <h3 className="title">Suggestions for you</h3>
                        {feedData?.suggestions?.map(user => <Follower key={user._id} user={user} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed