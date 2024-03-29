import React, { useContext, useState, useRef } from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';
import { Bell, CircleUser, Search } from 'lucide-react';
import { logout } from '../../authContext/AuthAction';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Ref for dropdown

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const handleLogout = async () => {
        try {
            dispatch(logout());
            localStorage.removeItem('accessToken');
            navigate('/');
            alert('Logout successful');
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Logout failed');
        }
    };

    const toggleDropdown = () => {
        dropdownRef.current.classList.toggle('show');
    };
    console.log(user)
    return (
        <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
            <div className='container'>
                <div className='left'>
                    <img
                        className='logo'
                        onClick={() => navigate('/home')}
                        src={logo}
                        alt=''
                    />
                </div>
                <div className='center'>
                    <Link to='/series' className='link'>
                        <span className='navbarmainLinks'>SERIES</span>
                    </Link>
                    <Link to='/movies' className='link'>
                        <span className='navbarmainLinks'>MOVIES</span>
                    </Link>
                </div>
                <div className='right'>
                    <Search className='icon' />
                    <Bell className='icon' />
                    <div className='profile'>
                        {user.profilePic === "" ? (
                            <CircleUser className='icon-profile' onClick={toggleDropdown} />
                        ) : (
                            <img src={user.profilePic} alt='Profile' onClick={toggleDropdown} />
                        )}
                        <div ref={dropdownRef} className='options dropdown'>
                            <span className='option-text'>
                                {user.username}
                            </span>
                            <span onClick={() => navigate('/account')} className='option'>
                                Account
                            </span>

                            
                            <span onClick={handleLogout} className='option'>
                                Logout
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
