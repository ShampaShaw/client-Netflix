import React, { useEffect } from 'react';
import "./featured.css"; // Importing styles from 'featured.css'
import { InfoOutlined, PlayArrow } from '@material-ui/icons'; // Importing Material-UI icons
import { useState } from 'react';
import axios from 'axios';

const Featured = ({type}) => {
  const [content,setContent] = useState({}) //to fetch random movie

  useEffect(() => {
    const getRandomContent = async () => {
      try{
        const res = await axios.get(`http://localhost:5000/api/movies/random?type=${type}`,{
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODczNTkyNDJmYWVlODE3MzlhYWJmNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNzMyNDQxNywiZXhwIjoxNzA3NzU2NDE3fQ.DqTtvoXD8WFZIWUSN0iB5QIvtZSYCZ2Rti4jCqVv8Js"
          }
        })
        setContent(res.data[0])
      }catch(err){
        console.log(err)
      }
    }
    getRandomContent()
  },[type])

  console.log(content)
  return (
    <div className='featured'>
      {/* Conditional rendering based on the 'type' prop */}
      {type && (
        <div className='category'>
          <span>{type === 'movies' ? 'Movies' : 'Series'}</span>
          {/* Dropdown for selecting genre */}
          <select name='genre' id='genre'>
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
