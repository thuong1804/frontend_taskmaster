'use client'
import { handelGetProfileUser } from "@/app/service/user-service";
import { getCookies } from "cookies-next";
import { useState, createContext, useEffect, useContext } from "react";

export const ProfileContext = createContext({});

export const ProfileProvider = ({children}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchData = async() => {
            const cookies = getCookies('login')
            if (cookies && cookies.login) {
                await handelGetProfileUser().then((res) => setUser(res.data.data.content))
            }
        }
        fetchData();
    }, [])

    const clearUserData = () => {
        setUser(null); // Clear user data
        // You might want to add additional logic here, such as clearing cookies or any other stored data related to the user
    };

    return (
        <ProfileContext.Provider value={{user, clearUserData}}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(ProfileContext);
    if (!context) {
      throw new Error('useUser must be used within a ProfileProvider');
    }
    return context;
  };
