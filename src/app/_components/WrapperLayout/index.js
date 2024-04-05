'use client'

import HeaderLayout from '@/component/layouts/HeaderLayout'
import React, { useEffect } from 'react'
import styles from './index.module.scss'
import NavBarLayout from '@/component/NavBar/navbar'
import { useUser } from '@/context/ProfileProvider'
import { getCookies } from 'cookies-next'
import { handelGetProfileUser } from '@/service/user-service'

function WrapperLayout({ children }) {
    const {user ,setUser} = useUser();

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
        <div className={styles.wrapperContainer}>
            <HeaderLayout  className={styles.header}/>
            <div className={styles.content}>
                <div className={styles.leftMenu}>
                    <NavBarLayout user={user}/>
                </div>
                <div className={styles.rightContent}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default WrapperLayout