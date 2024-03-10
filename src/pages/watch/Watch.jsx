import React from 'react';
import './watch.css';
import { MoveLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Watch = () => {
  const location = useLocation()
  const movie = location.movie;
  return (
    <div className='watch'>
    <Link to='/home'>
      <div className='back'>
        <MoveLeft  />
         Go Back
      </div>
    </Link>
      <video className='video' autoPlay controls src={movie?.video} alt='sunset video' />
    </div>
  );
}

export default Watch;
