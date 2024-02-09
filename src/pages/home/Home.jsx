import React, { useEffect, useState } from 'react'
import { AcUnit } from '@material-ui/icons'
import './home.css'
import Navbar from '../../component/navbar/Navbar'
import Featured from '../../component/featured/Featured'
import List from '../../component/list/List'
import axios from 'axios'

const Home = ({type}) => {
  const [lists,setLists] = useState([])
  const [genre,setGenre] = useState(null)

  useEffect(() => {
    const getRandomLists = async () => {
      try{
        const res = await axios.get(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODczNTkyNDJmYWVlODE3MzlhYWJmNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNzIzMjExOCwiZXhwIjoxNzA3NjY0MTE4fQ.8iMREagSWgFNaEfbpyVQTUokTdRVKXaUtFSEloD7Tig"
          }
        })
        setLists(res.data)
      } catch(err){
        console.log(err)
      }
    }
    getRandomLists()
  },[type,genre])
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