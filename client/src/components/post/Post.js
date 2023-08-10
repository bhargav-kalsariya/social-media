import React from 'react'
import Avatar from '../avatar/Avatar'
import './Post.scss';
import { AiOutlineHeart } from 'react-icons/ai'

function Post({ post }) {
    return (
        <div className='Post'>
            <div className="heading">
                <Avatar src={post?.owner?.avatar?.url} />
                <h4>{post?.owner?.name}</h4>
            </div>
            <div className="content">
                <img src={post?.image?.url} alt="nature" />
            </div>
            <div className="footer">
                <div className="like">
                    <AiOutlineHeart className='icon' />
                    <h4>{`${post?.likeCount} likes`}</h4>
                </div>
                <p className='caption'>{post?.caption}</p>
                <h6 className="time-ago">{post?.timeAgo}</h6>
            </div>
        </div>
    )
}

export default Post