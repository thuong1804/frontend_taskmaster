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

export default function HeaderLayout({ className }) {
    const router = useRouter()
    const { clearUserData } = useUser();

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
                   <AuditOutlined /> Profile
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


    return (
        <div className={classNames(styles.container, className)}>
            <div className={styles.contentLeft}>
                <Image src={imgLogo} alt='logo' width={70} height={70}></Image>
                <h3>Task Master</h3>
            </div>
            <div className={styles.contentRight}>
                <Dropdown
                    menu={{
                        items,
                    }}
                    placement="bottomRight"
                >
                    <UserOutlined className={styles.iconProfile} />
                </Dropdown>
            </div>
        </div>
    )
}
