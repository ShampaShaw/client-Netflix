import React, { useEffect, useState } from 'react';
import './listItem.css';
import axios from 'axios';
import { Add, PlayCircleFilled, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/authContext/authContext';
import Loader from '../../component/loader/Loader';

function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true); // State to manage loading
  const serverURL = process.env.SERVER_URL || "http://localhost:5000";
  const { user } = useAuth();

  useEffect(() => {
    const getMovie = async () => {
      try {
        if (user && user.accessToken) { // Check if user is authenticated
          const res = await axios.get(`${serverURL}/api/movies/find/` + item, {
            headers: {
              token: `Bearer ${user.accessToken}`
            }
          });
          setMovie(res.data);
          setLoading(false); // Set loading to false after fetching data
          console.log("lsititem:", user.accessToken, res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item, serverURL, user?.accessToken, user]);

  return (
    <Link to={{ pathname: '/watch', movie: movie }}>
      <div
        className='listItem'
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)} /* Corrected event handler name */
      >
        {loading ? ( // Show loader while loading data
          <Loader />
        ) : (
          <>
            <img src={movie?.img} alt='' />
            {isHovered && (
              <>
                <video src={movie?.trailer} autoPlay={true} loop />
                <div className='itemInfo'>
                  <div className='icons'>
                    <PlayCircleFilled className='icon' />
                    <Add className='icon' />
                    <ThumbUpAltOutlined className='icon' />
                    <ThumbDownAltOutlined className='icon' />
                  </div>
                  <div className='itemInfoTop'>
                    <span>{movie?.duration}</span>
                    <span className='limit'>+{movie?.limit}</span>
                    <span>{movie?.year}</span>
                  </div>
                  <div className='desc'>{movie?.desc}</div>
                  <div className='genre'>{movie?.genre}</div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Link>
  );
}

export default ListItem;
