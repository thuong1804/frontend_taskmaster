"use client"

import { Menu } from 'antd';
import styles from './home.module.scss'
import { useRouter } from 'next/navigation'
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import ListPageUser from '../manager-user/page';
import { useState } from 'react';
import TodoList from '../todo-list/page';

const Home = () => {
    const [activeKey, setActiveKey] = useState('1')
    const router = useRouter();

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const items = [
        getItem('User-manager', 'sub1', <MailOutlined />, [
            getItem(' List user', '1'),
          ]),
        {
            type: 'divider',
        },
        getItem('Task', 'sub4', <SettingOutlined />, [
            getItem('List task', '9'),
          ]),
    ];


    const onClickItem = ( item) => {
        console.log({item})
        setActiveKey(item.key)
    }

    return (
        <div className={styles.container}>
            <Menu
                onClick={onClickItem}
                style={{
                    width: 256,
                }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
            <div className={styles.listPage}>
                {activeKey === '1' ? (
                    <ListPageUser />
                ) : (
                    <TodoList />
                )}
            </div>
        </div>
    )
}
export default Home;