// Provide context to rest of web app

import { createContext, useState, useEffect } from "react";

/*
    Creating context object, returns:
        - Provider: Makes context available to all of its descendant components
        - Consumer (useContext): Used to access context value within descendants
*/
const AuthContext = createContext(null); // Creating context

// Provides Authentication 
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    // Updating User from localstorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider value = {{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
