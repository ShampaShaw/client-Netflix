import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const serverURL = process.env.SERVER_URL || 'http://localhost:5000';

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            // If access token exists in localStorage, set user and token
            setUser({ accessToken: storedToken, isAuthenticated: true });
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${serverURL}/api/auth/login`, {
                email: email,
                password: password
            });
            const accessToken = response.data.accessToken;
            setUser({ accessToken });
            localStorage.setItem('accessToken', accessToken); // Store token in localStorage
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('accessToken'); // Remove token from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
