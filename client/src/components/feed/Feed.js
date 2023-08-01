import React from 'react'
import './Feed.scss';
import Post from '../post/Post';
import Follower from '../follwers/Follower';

function Feed() {
    return (
        <div className='Feed'>
            <div className="container">
                <div className="left-side">
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
                <div className="right-side">
                    <div className="following">
                        <h3 className="title">You Are Following</h3>
                        <Follower />
                        <Follower />
                        <Follower />
                        <Follower />
                    </div>
                    <div className="suggestion">
                        <h3 className="title">You Are Following</h3>
                        <Follower />
                        <Follower />
                        <Follower />
                        <Follower />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed