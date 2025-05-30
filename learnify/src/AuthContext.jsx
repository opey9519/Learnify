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
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        if (token && username) { // Catches undefined behavior
            try {
                setUser({username, token})
            }
            catch (error) {
                console.log("Error parsing data", error)
            }
        }
    }, [])

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem("token", userData.token);
        localStorage.setItem("username", userData.username);
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("username")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext