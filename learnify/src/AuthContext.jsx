// Provide context to rest of web app

import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

/*
    Creating context object, returns:
        - Provider: Makes context available to all of its descendant components
        - Consumer (useContext): Used to access context value within descendants
*/
const AuthContext = createContext(null); // Creating context

// Provides Authentication 
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const refreshAccessToken = async () => {
        const refresh_token = localStorage.getItem("refresh_token")
        const token = localStorage.getItem("token")
    

        if (!refresh_token) {
           console.log("No refresh token available")
           return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/refresh", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({refresh_token})
            })

            if (!response.ok) {
                console.log("Failed to refresh token")
                localStorage.removeItem("token")
                localStorage.removeItem("refresh_token")
                setUser(null)
            }

            const refresh_response = await response.json()
            const new_access_token = refresh_response.access_token
            localStorage.setItem("token", new_access_token)
            console.log("refreshed token!")

        } catch (error) {
            console.log("Error refreshing access token", error)
        }
    }


    // Updating User from localstorage
    useEffect(() => {
        console.log("AuthContext mounted")
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const refresh_token = localStorage.getItem("refresh_token")
        

        if ((token && token !== "undefined") && (username && username !== "undefined")) { // Catches undefined behavior
            try {
                const decoded = jwtDecode(token)
                const current_time = Date.now() / 1000
                console.log(decoded.exp)
                console.log(current_time)

                if (decoded.exp - current_time < 120) {
                    console.log("Token is expiring less than 2 minutes")
                    refreshAccessToken()
                } 

                setUser({username, token})
            }
            catch (error) {
                console.log("Error parsing data", error)
            }
        }
    }, [])

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem("token", userData.access_token);
        localStorage.setItem("refresh_token", userData.refresh_token)
        localStorage.setItem("username", userData.username);
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("username")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;