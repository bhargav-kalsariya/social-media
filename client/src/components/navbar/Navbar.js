import './Navbar.scss';
import Avatar from '../avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStorageManager';
import { axiosClient } from '../../utils/axiosClient';
function Navbar() {

    const navigate = useNavigate();
    const myProfile = useSelector(state => state.appConfigReducer.myProfile);

    async function handleLogoutClicked() {

        try {

            await axiosClient.post('/auth/logout');
            removeItem(KEY_ACCESS_TOKEN);
            navigate('/login');

        } catch (e) {

            console.log(e);

        }

    }

    return (
        <div className='navbar'>
            <div className="container">
                <h2 className="banner hover-link" onClick={() => navigate('/')}>Social media</h2>
                <div className="right-side">
                    <div className=" hover-link" onClick={() => navigate(`/profile/${myProfile?._id}`)}>
                        <Avatar className="profile" src={myProfile?.avatar.url} />
                    </div>
                    <div className="logout hover-link" onClick={handleLogoutClicked}>
                        <AiOutlineLogout />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar