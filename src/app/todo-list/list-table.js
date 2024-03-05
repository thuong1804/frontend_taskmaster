'use client'
import { useRouter } from 'next/navigation';
import ListContent from './list';
import styles from './list-table.module.scss'
import { Button, Input } from 'antd';
import { useState } from 'react';
const ListTable = () => {
    const router = useRouter();
    const [account, setAccount] = useState();
    // useEffect(() => {
    //     let session = sessionStorage.getItem("item_key");
    //     if(session) {
    //         setAccount(session)
    //     }
    // }, [])
    return (
        <div className={styles.container}>
            <div className={styles.table}>
                <div className={styles.input}>
                    <Button type='primary' onClick={() => router.push('/todo-list/form-add-todo')}>Add</Button>
                </div>
                <ListContent />
            </div>
        </div>
    )
}
export default ListTable;