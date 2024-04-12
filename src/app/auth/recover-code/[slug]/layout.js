import React from 'react'
import styles from './layout.module.scss'
import HeaderLayout from '@/component/layouts/HeaderLayout'

export default function layout({children}) {
  return (
    <div className={styles.container}>
        <HeaderLayout />
        {children}
    </div>
  )
}
