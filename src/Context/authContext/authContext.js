import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const serverURL = process.env.SERVER_URL || 'http://localhost:5000';

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${serverURL}/api/auth/login`, {
                email: email,
                password: password
            });
            setUser(response.data);
            console.log("User logged in", response.data);
            return response.data;

        } catch (error) {
            throw new Error(error.response.data.message);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};