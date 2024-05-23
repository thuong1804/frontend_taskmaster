'use client'
import { handelGetProfileUser, handelUpdateProfile } from "@/service/userService";
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

    const updateProfile = async({bodyData}) => {
        await handelUpdateProfile(bodyData).then(res => {
            if (res.data.result) {
                setUser(res.data.data.content)
            }
        })
    }

    const clearUserData = () => {
        setUser(null);
    };

    return (
        <ProfileContext.Provider value={{ user, clearUserData, setUser, updateProfile }}>
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
