import React, { useEffect, useState } from 'react';
import './home.css';
import Navbar from '../../component/navbar/Navbar';
import Featured from '../../component/featured/Featured';
import List from '../../component/list/List';
import axios from 'axios';
import { useAuth } from '../../Context/authContext/authContext';
import Loader from '../../component/loader/Loader';

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const { user } = useAuth();
  const serverURL = process.env.SERVER_URL || 'http://localhost:5000';
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        if (user && user.isAuthenticated && user.accessToken) { // Check if user is authenticated and accessToken is defined
          const res = await axios.get(`${serverURL}/api/lists/${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
            headers: {
              token: `Bearer ${user.accessToken}`
            }
          });
          setLists(res.data);
        }
        setLoading(false); // Set loading to false after fetching data
      } catch (err) {
        console.log(err);
        setLoading(false); // Set loading to false if there's an error
      }
    };
    getRandomLists();
  }, [type, genre, serverURL, user?.accessToken, user]);

  // If loading, show loader
  if (loading) {
    return <Loader />;
  }

  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {/* Inside the map function in your Home component */}
      {lists.map((list, index) => {
        return (
          <List key={index} list={list} />
        );
      })}
    </div>
  );
}

export default Home;
