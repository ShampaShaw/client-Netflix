import React, { useContext } from 'react';
import './Account.css'; // Import CSS file for styling
import { AuthContext } from '../../authContext/AuthContext';

const MyAccounts = () => {
    const user = useContext(AuthContext);
    console.log(user);
    return (
        <div className="my-accounts-container">
            <div className="user-info">
                <div className="username">Hello, {user.user?.username}</div>
                <img src={user.user.profilePic} alt="Profile Pic" className="profile-pic" />
                <div className="actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete Account</button>
                </div>
            </div>
            <div className="movie-list">
                <h2>Favourite Movies</h2>
                {/* <ul>
                    
                    {user.favoriteMovies.map(movie => (
                        <li key={movie.id}>{movie.title}</li>
                    ))}
                </ul> */}
                <h2>Liked Movies</h2>
                {/* <ul>
                    
                    {user.likedMovies.map(movie => (
                        <li key={movie.id}>{movie.title}</li>
                    ))}
                </ul> */}
            </div>
        </div>
    );
};

export default MyAccounts;
