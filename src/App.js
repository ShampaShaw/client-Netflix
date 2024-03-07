import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './app.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import { AuthProvider, useAuth } from './Context/authContext/authContext';
import Loader from './component/loader/Loader';

const App = () => {
  // Use the useAuth hook to access the user and login/logout functions
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = user && user.isAuthenticated;
    // If not authenticated and there's no accessToken in localStorage, navigate to the login page
    if (!isAuthenticated && !localStorage.getItem('accessToken')) {
      setLoading(false);
    }
    // If authenticated, set loading to false
    setLoading(false);
  }, [user]);

  // If loading, show loading component
  if (loading) {
    return <Loader />;
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={user && user.isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {user && user.isAuthenticated && (
            <>
              <Route path="/movies" element={<Home type='movie' />} />
              <Route path="/series" element={<Home type='series' />} />
              <Route path="/watch" element={<Watch />} />
            </>
          )}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
