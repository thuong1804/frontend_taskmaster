import React from 'react'
import styles from './index.module.scss'
import { LoadingOutlined } from '@ant-design/icons'

export default function Loading() {
  return (
    <div className={styles.container}>
        <h2>
            Loading...
        </h2>
        <LoadingOutlined className={styles.icon}/>
    </div>
  )
}
