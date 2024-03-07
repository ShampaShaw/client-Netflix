import React, { useEffect } from 'react';
import "./featured.css"; // Importing styles from 'featured.css'
import { InfoOutlined, PlayArrow } from '@material-ui/icons'; // Importing Material-UI icons
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/authContext/authContext';

const Featured = ({type,setGenre}) => {
  const [content,setContent] = useState({}) //to fetch random movie
  console.log(content)
  const { user } = useAuth()
  const serverURL = process.env.SERVER_URL || 'http://localhost:5000';

  useEffect(() => {
    const getRandomContent = async () => {
      try{
        const res = await axios.get(`${serverURL}/api/movies/random?type=${type}`,{
          headers: {
            token: `Bearer ${user?.accessToken}` // Access token for authentication
          }
        })
        setContent(res.data[0])
      }catch(err){
        console.log(err)
      }
    }
    getRandomContent()
  },[type, serverURL, user?.accessToken])

  console.log(content)
  return (
    <div className='featured'>
      {/* Conditional rendering based on the 'type' prop */}
      {type && (
        <div className='category'>
          <span>{type === 'movies' ? 'Movies' : 'Series'}</span>
          {/* Dropdown for selecting genre */}
          <select name='genre' id='genre' onChange={(e) => setGenre(e.target.value)}>
          <option>Genre</option>
            {/* Options for different genres */}
            <option value='adventure'>Adventure</option>
            <option value='comedy'>Comedy</option>
            {/* ... other genre options ... */}
          </select>
        </div>
      )}

      {/* Main content of the featured item */}
      <img
        src={content.img}
        alt=''
      />
      <div className='info'>
        {/* Additional image and description */}
        <img
          src={content.imgTitle}
          alt=''
        />
        <span className='desc'>
          {content.desc}
        </span>

        {/* Buttons for playing and getting more information */}
        <div className='buttons'>
          <button className='play'>
            <PlayArrow/>
            <span>Play</span>
          </button>
          <button className='more'>
            <InfoOutlined/>
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
