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
        const res = await axios.get(`http://localhost:5000/api/lists/${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`
         ,{
          headers: {
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODczNTkyNDJmYWVlODE3MzlhYWJmNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwODE1NTE5NiwiZXhwIjoxNzEwNzQ3MTk2fQ.i3XAR8xa92OypUnjubLEPrFUuaYLiQHYo3LDM8ungxo"
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