import React from 'react'
import Avatar from '../avatar/Avatar'
import './Post.scss';
import bgimg from '../../assets/pexels-michael-block-3225517.jpg'
import { AiOutlineHeart } from 'react-icons/ai'

function Post({ post }) {
    return (
        <div className='Post'>
            <div className="heading">
                <Avatar />
                <h4>bhargav kumar</h4>
            </div>
            <div className="content">
                <img src={post ? post : bgimg} alt="bg image" />
            </div>
            <div className="footer">
                <div className="like">
                    <AiOutlineHeart className='icon' />
                    <h4>4 likes</h4>
                </div>
                <p className='caption'>This is nature Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit voluptatibus qui inventore ad voluptates, </p>
                <h6 className="time-ago">4 hrs ago</h6>
            </div>
        </div>
    )
}

export default Post