
import React, { createContext, useState } from 'react';
import useAuthStore from './store/useAuthStore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { isAuthenticated, setIsAuthenticated } = useAuthStore();

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
