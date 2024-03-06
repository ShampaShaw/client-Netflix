import React, { useState } from 'react';
import './navbar.css';
import { ArrowDropDown, Notifications, Search } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate(); 

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const handleLogout = () => {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(response => {
            if (response.ok) {
                localStorage.removeItem('accessToken');
                navigate.push('/login');
                alert('Logout successful');
            } else {
                alert('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error logging out:', error);
            alert('Error logging out');
        });
    };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}> 
       <div className='container'>
            <div className='left'>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Dfnefr.png/120px-Dfnefr.png'
                    alt=''
                />
                <Link to='/' className='link'>
                    <span>Homepage</span>
                </Link>
                <Link to='/Series' className='link'>
                    <span>Series</span>
                </Link>
                <Link to='/movies' className='link'>
                    <span>Movies</span>
                </Link>
                <span>New ans Popular</span>
                <span>My List</span>
            </div>
            <div className='right'>
                <Search className='icon'/>
                <span>KID</span>
                <Notifications className='icon'/>
                <img
                    src='https://s3-ap-south-1.amazonaws.com/ricedigitals3bucket/AUPortalContent/2020/06/27062349/webseries.jpg' 
                    alt=''
                />
                <div className='profile'>
                    <ArrowDropDown className='icon'/>
                    <div className='options'>
                        <span>Settings</span>
                        <span onClick={handleLogout}>Logout</span>
                    </div>
                </div>
            </div>
       </div>
    </div>
  )
}

export default Navbar