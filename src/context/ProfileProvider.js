'use client'
import { handelGetProfileUser } from "@/service/user-service";
import { getCookies } from "cookies-next";
import { useState, createContext, useContext, useEffect } from "react";

export const ProfileContext = createContext({});

export const ProfileProvider = ({ children }) => {
const [user, setUser] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cookies = getCookies('login');
                if (cookies && cookies.login) {
                    const res = await handelGetProfileUser();
                    setUser(res.data.data.content);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        fetchData();
    }, [])

    const clearUserData = () => {
        setUser(null); // Clear user data
    };

    return (
        <ProfileContext.Provider value={{ user, clearUserData, setUser }}>
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
