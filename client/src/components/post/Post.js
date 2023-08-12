import React from 'react'
import Avatar from '../avatar/Avatar'
import './Post.scss';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slices/appConfigSlice';
import { likeAndUnlike } from '../../redux/slices/postsSlice';
import { useNavigate } from 'react-router-dom';

function Post({ post }) {

    const disPatch = useDispatch();
    const navigate = useNavigate();

    function handlePostLiked() {

        try {

            disPatch(likeAndUnlike({

                postId: post._id,

            }));

        } catch (error) {

            Promise.reject(error);

        } finally {

            disPatch(setLoading(false));

        }

    }

    return (
        <div className='Post'>
            <div className="heading" onClick={() => navigate(`/profile/${post?.owner?._id}`)}>
                <Avatar src={post?.owner?.avatar?.url} />
                <h4>{post?.owner?.name}</h4>
            </div>
            <div className="content">
                <img src={post?.image?.url} alt="" />
            </div>
            <div className="footer">
                <div className="like" onClick={handlePostLiked}>
                    {post?.isLiked ? <AiFillHeart style={{ color: 'red' }} className='icon' /> : <AiOutlineHeart className='icon' />}
                    <h4>{`${post?.likeCount} likes`}</h4>
                </div>
                <p className='caption'>{post?.caption}</p>
                <h6 className="time-ago">{post?.timeAgo}</h6>
            </div>
        </div>
    )
}

export default Post