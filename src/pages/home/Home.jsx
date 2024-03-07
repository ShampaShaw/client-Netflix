import React, { useEffect, useState } from 'react'
import { AcUnit } from '@material-ui/icons'
import './home.css'
import Navbar from '../../component/navbar/Navbar'
import Featured from '../../component/featured/Featured'
import List from '../../component/list/List'
import axios from 'axios'
import { useAuth } from '../../Context/authContext/authContext'

const Home = ({type}) => {
  const [lists,setLists] = useState([])
  const [genre,setGenre] = useState(null)
  const { user } = useAuth()
  const serverURL = process.env.SERVER_URL || 'http://localhost:5000';
  console.log(user)
  
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
  },[type,genre, serverURL, user?.accessToken])
  return (
    <div className='home'>
        <Navbar/>
        <Featured type={type} setGenre={setGenre}/>
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