'use client'
import urlPath from '@/constant/path';
import { EnterOutlined, FrownOutlined } from '@ant-design/icons';
import { Button } from 'antd'
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function NotFound() {
    const router = useRouter();
    const cookies = getCookie('login')
    const handelBackButton = () => {
        if (cookies) {
            router.push(urlPath.home)
        } else {
            router.push(urlPath.login)
        }
    }
  return (
    <main style={{
            width:'100vw', 
            height:'100vh', 
            display:'flex', 
            alignItems:'center', 
            justifyContent:'center',
        }}>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <h1 style={{fontSize:'150px', margin: 0}}>404 </h1>
                <h3>Page Not Found <FrownOutlined /></h3>
                <Button onClick={handelBackButton}>Go Back <EnterOutlined /></Button>
            </div>
    </main>
  )
}
