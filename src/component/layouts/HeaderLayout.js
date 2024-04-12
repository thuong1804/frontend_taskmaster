'use client'
import React, { useEffect } from 'react'
import styles from './HeaderLayout.module.scss'
import { Button, Dropdown } from 'antd'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import urlPath from '@/constant/path'
import { useUser } from '../../context/ProfileProvider'
import Image from 'next/image'
import imgLogo from '../../../public/output-logo.png'
import { AuditOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import Profile from '@/app/_profile/page'

export default function HeaderLayout({ className }) {
    const router = useRouter()
    const { user, clearUserData } = useUser();

    const handelSignOut = () => {
        deleteCookie('login')
        deleteCookie('refreshToken')
        clearUserData();
        router.push(urlPath.login)
    }

    const items = [
        {
            key: '1',
            label: (
                <div target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    <Profile />
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <span style={{ color: 'red' }} onClick={handelSignOut}>
                    <LoginOutlined /> Log Out
                </span>
            ),
        },
    ];

    const handelBackHome = (user) => {
        return user ? router.push(urlPath.home) : router.push(urlPath.login)
    }


    return (
        <div className={classNames(styles.container, className)}>
            <div className={styles.contentLeft} onClick={() => handelBackHome(user)}>
                <Image src={imgLogo} alt='logo' width={70} height={70}></Image>
                <h3>Task Master</h3>
            </div>
            <div className={styles.contentRight}>
                {user && (
                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottomRight"
                    >
                        <UserOutlined className={styles.iconProfile} />
                    </Dropdown>
                )}
            </div>
        </div>
    )
}
