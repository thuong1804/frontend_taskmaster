'use client'
import styles from './HeaderLayout.module.scss'
import { Avatar, Dropdown } from 'antd'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import urlPath from '@/constant/path'
import { useUser } from '../../context/ProfileProvider'
import {LoginOutlined, UserOutlined } from '@ant-design/icons'
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
                <Profile/>
            ),
        },
        {
            key: '2',
            label: (
                <span 
                    style={{ 
                        color: 'red', 
                        display:'block', 
                        width:'100%' 
                    }}
                    onClick={handelSignOut}>
                        <LoginOutlined /> Log Out
                </span>
            ),
        },
    ];
    console.log({user})
    return (
        <div className={styles.container}>
            {user && (
                 <Dropdown
                    menu={{
                        items,
                    }}
                    placement="bottomRight"
                    
                >
                    <div className={styles.content}>
                        <Avatar
                            className={styles.avatar}
                            src={`http://localhost:3005/${user.avatar}`}
                            >
                                {user.avatar ? user.avatar : <UserOutlined />}
                        </Avatar>
                        <span>{user.name}</span>
                    </div>
                </Dropdown>
            )}
        </div>
    )
}
