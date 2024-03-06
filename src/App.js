import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './app.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import { AuthProvider } from './Context/authContext/authContext';

const App = () => {
  // Assume user authentication state
  const isAuthenticated = true;

  return (
    <AuthProvider> {/* Wrap entire app with AuthProvider */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/register" />} // Redirect to register if not authenticated
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          {isAuthenticated && ( // Conditionally render routes if authenticated
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
