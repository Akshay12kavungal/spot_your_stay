import React, { createContext, useState, ReactNode } from 'react';
import axios from 'axios';

// Set the default context value (without TypeScript types)
const defaultAuthContextValue = {
    authTokens: null,
    loginUser: async () => {},
    logoutUser: () => {},
    refreshToken: async () => {}
};

// Create the context with the default value
const AuthContext = createContext(defaultAuthContextValue);

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => {
        const tokens = localStorage.getItem("authTokens");
        return tokens ? JSON.parse(tokens) : null;
    });

    const loginUser = async (username, password) => {
        try {
            const response = await axios.post("/api/token/", { username, password });
            setAuthTokens(response.data);
            localStorage.setItem("authTokens", JSON.stringify(response.data));
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        localStorage.removeItem("authTokens");
    };

    const refreshToken = async () => {
        try {
            const response = await axios.post("/api/token/refresh/", {
                refresh: authTokens?.refresh,
            });
            setAuthTokens({ ...authTokens, access: response.data.access });
            localStorage.setItem("authTokens", JSON.stringify({ ...authTokens, access: response.data.access }));
        } catch (error) {
            logoutUser();
        }
    };

    const contextData = {
        authTokens,
        loginUser,
        logoutUser,
        refreshToken,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
