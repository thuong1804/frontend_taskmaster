'use client'

import React, { useEffect } from 'react'
import styles from './DashboardLayout.module.scss'
import NavBarLayout from '@/component/NavBar/navbar'
import { useUser } from '../../context/ProfileProvider'
import { getCookies } from 'cookies-next'
import { handelGetProfileUser } from '@/service/user-service'

export default function DashboardLayout({ children }) {
    const {setUser} = useUser();

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
    }, [setUser])

    return (
            <div className={styles.layoutContainer}>
                <div className={styles.leftLayout}>
                    <NavBarLayout />
                </div>
                <div className={styles.rightLayout}>{children}</div>
            </div>
    )
}
