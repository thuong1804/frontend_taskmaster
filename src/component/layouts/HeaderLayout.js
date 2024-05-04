'use client'
import styles from './HeaderLayout.module.scss'
import { Dropdown } from 'antd'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import urlPath from '@/constant/path'
import { useUser } from '../../context/ProfileProvider'
import {LoginOutlined, UserOutlined } from '@ant-design/icons'
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

    return (
        <div className={styles.container}>
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
    )
}
