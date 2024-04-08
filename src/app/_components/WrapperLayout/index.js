'use client'

import HeaderLayout from '@/component/layouts/HeaderLayout'
import React from 'react'
import styles from './index.module.scss'
import NavBarLayout from '@/component/NavBar/navbar'
import { useUser } from '@/context/ProfileProvider'
import classNames from 'classnames'
import Loading from '@/component/Loading'

function WrapperLayout({ children }) {
    const {user} = useUser();

    if(!user)
    return <div className={classNames(styles.wrapperContainer, styles.loading)}><Loading/></div>

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