import React, { useEffect, useState } from 'react';
import './listItem.css';
import axios from 'axios';
import { Add, PlayCircleFilled, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';

function ListItem({ index,item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie,setMovie] = useState({})
  const server = process.env.SERVER_URL || "http://localhost:5000";  

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(`${server}/api/movies/find/` + item
        ,{
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODczNTkyNDJmYWVlODE3MzlhYWJmNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwODE1NTE5NiwiZXhwIjoxNzEwNzQ3MTk2fQ.i3XAR8xa92OypUnjubLEPrFUuaYLiQHYo3LDM8ungxo"
          }
        }
        )
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getMovie()
  }, [item, server])
  

  return (
    <Link to={{pathname:'/watch',movie:movie}}>
    <div
    className='listItem'
    style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)} /* Corrected event handler name */
  >
    <img src={movie?.img} alt='' />
    {isHovered && (
      <>
        <video src={movie?.trailer} autoPlay={true} loop />
        <div className='itemInfo'>
          <div className='icons'>
            <PlayCircleFilled className='icon'/>
            <Add className='icon'/>
            <ThumbUpAltOutlined className='icon'/>
            <ThumbDownAltOutlined className='icon'/>
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
  </div>
    
    </Link>
    
  );
}

export default ListItem;