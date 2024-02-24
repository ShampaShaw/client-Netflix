import React, { useContext, useState } from 'react'
import './navbar.css'
import { ArrowDropDown, Notifications, Search } from '@material-ui/icons'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext'
import { logout } from '../../authContext/AuthAction';

const Navbar = () => {
    const [isScrolled,setIsScrolled] = useState(false);  /*for the black color at the top of the navbar*/
    const {dispatch} = useContext(AuthContext);

    window.onscroll = () =>{
        setIsScrolled(window.scrollY === 0 ? false : true)
        return () => (window.onscroll = null)
    }
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
                    <span className='navbarmainLinks'>Series</span>
                </Link>
                <Link to='/movies' className='link'>
                    <span className='navbarmainLinks'>Movies</span>
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
                        <span onClick={() => dispatch(logout())}>Logout</span>
                    </div>
                </div>
            </div>
       </div>
    </div>
  )
}

export default Navbar