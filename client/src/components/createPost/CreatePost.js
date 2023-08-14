import React, { useState } from 'react'
import './CreatePost.scss';
import Avatar from '../avatar/Avatar';
import { BsCardImage } from 'react-icons/bs'
import { axiosClient } from '../../utils/axiosClient'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/slices/postsSlice';

function CreatePost() {

    const [postImg, setPostImg] = useState('');
    const [caption, setCaption] = useState('');
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);
    const disPatch = useDispatch();

    function handleImageChange(e) {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setPostImg(fileReader.result)
            }
        }
    }

    async function handlePostSubmit() {

        try {

            const response = await axiosClient.post('/posts/', {
                caption,
                postImg
            })
            console.log('create post', response);
            disPatch(getUserProfile({
                userId: myProfile?._id
            }))

        } catch (error) {

            return Promise.reject(error);

        } finally {

            setCaption('');
            setPostImg('');

        }

    }

    return (
        <div className='createPost'>
            <div className="left-part">
                <Avatar src={myProfile?.avatar?.url} />
            </div>
            <div className="right-part">
                <input value={caption} type="text" className='captionInput' placeholder=' what is your thought ? ' onChange={(e) => setCaption(e.target.value)} />

                {postImg && <div className="img-container">
                    <img className='post-img' src={postImg} alt="post-img" />
                </div>}

                <div className="bottom-part">
                    <div className="input-post-img">
                        <label htmlFor="userImg" className='lableImg'>
                            <BsCardImage />
                        </label>
                        <input className='inputImg' type="file" accept='image/*' id="userImg" onChange={handleImageChange} />
                    </div>
                    <div className="post-btn btn-primary" onClick={handlePostSubmit}>Post</div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost