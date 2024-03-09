import React, { useEffect, useState } from 'react'
import './home.css'
import Navbar from '../../component/navbar/Navbar'
import Featured from '../../component/featured/Featured'
import List from '../../component/list/List'
import axios from 'axios'
import { AuthContext } from '../../authContext/AuthContext'
import { useContext } from 'react'

const Home = ({type}) => {
  const [lists,setLists] = useState([])
  const [genre,setGenre] = useState(null)
  const {user}= useContext(AuthContext)
  const serverURL = process.env.SERVER_URL || 'http://localhost:5000';
  useEffect(() => {
    const getRandomLists = async () => {
      try{
        const res = await axios.get(`${serverURL}/api/lists/${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`
         ,{
          headers: {
            token: `Bearer ${user?.accessToken}`
          }
        })
        setLists(res.data)
      } catch(err){
        console.log(err)
      }
    }
    getRandomLists()
  },[type,genre, user?.accessToken, serverURL])
  return (
    <div className='home'>
        <Navbar/>
        <Featured type={type}/>
        {/* Inside the map function in your Home component */}
        {lists.map((list, index) => {
          return (
            <List key={index} list={list} />
          );
        })}
    </div>
  )
}

export default Home