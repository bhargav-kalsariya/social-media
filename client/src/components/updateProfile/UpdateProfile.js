import React, { useEffect, useState } from 'react'
import './UpdateProfile.scss';
import { useSelector } from 'react-redux';

function UpdateProfile() {

    const myProfile = useSelector(state => state.appConfigReducer.myProfile);

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [UserImg, setUserImg] = useState('');

    useEffect(() => {

        setName(myProfile?.name || '')
        setBio(myProfile?.email || '')
        setUserImg(myProfile?.avatar || '')

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

    return (
        <div className='UpdateProfile'>
            <div className="container">
                <div className="left-side">
                    <div className="input-user-img">
                        <label htmlFor="userImg" className='lableImg'>
                            <img src={UserImg} alt={name} />
                        </label>
                        <input className='inputImg' type="file" accept='image/*' id="userImg" onChange={handleImageChange} />
                    </div>
                </div>
                <div className="right-side">
                    <form action="">
                        <input value={name} type="text" placeholder='Your Name' onChange={(e) => setName(e.target.value)} />
                        <input value={bio} type="text" placeholder='Your Bio' onChange={(e) => setBio(e.target.value)} />
                        <input type="submit" className='btn-primary' />
                    </form>
                    <input type="submit" className='btn-primary delete-account' value='Delete Account' />
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile