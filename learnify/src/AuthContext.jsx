import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// Provides Authentication 
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState = null;
}