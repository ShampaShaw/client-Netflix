import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './app.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import { AuthContextProvider, AuthContext } from './authContext/AuthContext';
import Loader from './component/loader/Loader';
import { useContext } from 'react';

const App = () => {


  const { isFetching, user } = useContext(AuthContext)
  console.log(user, isFetching)

  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isFetching ? <Loader /> : <Home />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
            <>
              <Route path="/movies" element={<Home type='movie' />} />
              <Route path="/series" element={<Home type='series' />} />
              <Route path="/watch" element={<Watch />} />
            </>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
