'use client'
import { useState, createContext, useContext, useEffect } from "react";
import { useUser } from "./ProfileProvider";
import { handelDeleteUser, handelGetListUser } from "@/service/userService";
import { toast } from "sonner";

export const UsersContext = createContext({});

export const ProviderUsers = ({ children }) => {
    const [users, setUsers] = useState();
    const {user} = useUser();
    const [reloadData, setReloadData] = useState(false);

    const fetchData = async () => {
        if (user?.id) {
            await handelGetListUser().then(res => {
                if (res.data.result) {
                    setUsers(res.data.data.content);
                }
            });
        }
    };

    const deleteUsers = async (userId) => {
        await handelDeleteUser(userId).then(res => {
            if (res.data.result) {
                toast.success('Delete user success')
                setReloadData(prevFlag => !prevFlag)
            }
        }).catch((error) => {
            if (error) {
                return toast.error('Delete user failed')
            }
        })
    };

    useEffect(() => {
        fetchData();
    }, [user?.id, reloadData]);

    return (
        <UsersContext.Provider value={{users, deleteUsers}}>
            {children}
        </UsersContext.Provider>
    )
}

export const useListUsers = () => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error('useListUsers must be used within a ProviderUsers');
    }
    return context;
};
