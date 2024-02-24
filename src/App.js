import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './app.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import { AuthContext } from './authContext/AuthContext';

const App = () => {
  const { user } = useContext(AuthContext);
  //const user = true;
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/register" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        { user && (
          <>
            <Route path="/movies" element={<Home type='movie' />} />
            <Route path="/series" element={<Home type='series' />} />
            <Route path="/watch" element={<Watch />} />
          </>
          )
        }
        
      </Routes>
    </Router>
  );
}

export default App;
