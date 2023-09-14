import React, { useEffect, useState } from 'react'
import './UpdateProfile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateMyProfile } from '../../redux/slices/appConfigSlice';
import dummyImg from '../../assets/user.png'
import { axiosClient } from '../../utils/axiosClient';
import { useNavigate } from 'react-router-dom';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStorageManager';

function UpdateProfile() {

    const myProfile = useSelector(state => state.appConfigReducer.myProfile);

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [userImg, setUserImg] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        setName(myProfile?.name || '')
        setBio(myProfile?.bio || '')
        setUserImg(myProfile?.avatar?.url)

    }, [myProfile])

    function handleImageChange(e) {

        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setUserImg(fileReader.result)
            }
        }

    }
    async function handleProfileDelete() {

        try {

            await axiosClient.delete('/');
            removeItem(KEY_ACCESS_TOKEN);
            navigate('/login');

        } catch (e) {

            console.log(e);

        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(updateMyProfile(
            {
                name, bio, userImg
            }
        ))
    }

    return (
        <div className='UpdateProfile'>
            <div className="container">
                <div className="left-side">
                    <div className="input-user-img">
                        <label htmlFor="userImg" className='lableImg'>
                            <img src={userImg ? userImg : dummyImg} alt='img' />
                        </label>
                        <input className='inputImg' type="file" accept='image/*' id="userImg" onChange={handleImageChange} />
                    </div>
                </div>
                <div className="right-side">
                    <form onSubmit={handleSubmit}>
                        <input value={name} type="text" placeholder='Your Name' onChange={(e) => setName(e.target.value)} />
                        <input value={bio} type="text" placeholder='Your Bio' onChange={(e) => setBio(e.target.value)} />
                        <input type="submit" className='btn-primary' onSubmit={handleSubmit} />
                    </form>
                    <input type="submit" className='btn-primary delete-account' value='Delete Account' onClick={handleProfileDelete} />
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile