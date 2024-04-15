import HeaderLayout from '@/component/layouts/HeaderLayout'
import React from 'react'
import styles from './layout.module.scss'

export default function layout({children}) {
  return (
    <div className={styles.container}>
        <HeaderLayout />
        {children}
    </div>
  )
}
