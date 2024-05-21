'use client'
import { notifications, readAll, readOne } from "@/service/notificationService";
import { useState, createContext, useContext, useEffect } from "react";
import { useUser } from "./ProfileProvider";
import { useRouter } from "next/navigation";

export const NotificationContext = createContext({});

export const ProviderNotification = ({ children }) => {
    const [itemNotifications, setItemNotfications] = useState();
    const {user} = useUser();
    const router = useRouter();
    const [isReadedAll, setIsReadedAll] = useState(false)

    const fetchData = async () => {
        if (user?.id) {
            await notifications(user.id).then(res => {
                if (res.data.result) {
                    setItemNotfications(res.data.data.content);
                }
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [user, isReadedAll]);

    const handelReadOne = async(id, link) => {
        await readOne({id}).then(res => {
            if (res.data.result) {
                fetchData();
                link && router.replace(`/${link}`)
            } 
        })
    }

    const handelReadAll = async(userId) => {
        await readAll({userId: [userId]})
        setIsReadedAll(true)
    }

    return (
        <NotificationContext.Provider value={{itemNotifications, handelReadAll, handelReadOne}}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a ProviderNotification');
    }
    return context;
};
