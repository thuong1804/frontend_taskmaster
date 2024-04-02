'use client'
import React, {useEffect} from 'react'
import styles from './HeaderLayout.module.scss'
import { Button } from 'antd'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import urlPath from '@/constant/path'
import { useUser } from '../../context/ProfileProvider'

export default function HeaderLayout({children}) {
    const router = useRouter()
    const {clearUserData} = useUser();

    const handelSignOut = () => {
        deleteCookie('login')
        deleteCookie('refreshToken')
        clearUserData();
        router.push(urlPath.login)
    }

  return (
    <div className={styles.container}>
        <Button className={styles.btnSignOut} onClick={handelSignOut}>Sign Out</Button>
        {children}
    </div>
  )
}
