'use client'
import { useState, createContext, useContext } from "react";

export const ProfileContext = createContext({});

export const ProfileProvider = ({ children }) => {
    const [user, setUser] = useState();

    const clearUserData = () => {
        setUser(null); // Clear user data
        // You might want to add additional logic here, such as clearing cookies or any other stored data related to the user
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
