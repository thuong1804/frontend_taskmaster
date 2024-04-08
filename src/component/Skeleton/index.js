import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import styles from './index.module.scss'

export default function Skeletons() {
    return (
        <div className={styles.container}>
            <Skeleton />
            <Skeleton count={5} />
        </div>
    )
}
