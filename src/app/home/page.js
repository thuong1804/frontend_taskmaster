"use client"

import { Button, Menu } from 'antd';
import styles from './home.module.scss'
import { useRouter } from 'next/navigation'
import { LogoutOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import ListPageUser from '../manager-user/page';
import { useEffect, useState } from 'react';
import urlPath from '../constant/path';
import { logout } from '../service/authService';
import { useUser } from '../component/context/ProfileProvider';
import ListTask from '../todo-list/list';

const Home = () => {
    const router = useRouter();
    const { user, clearUserData } = useUser();
    const userAdmin = user?.groupId === 1
    const [activeKey, setActiveKey] = useState()
    console.log({activeKey})
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
            getItem('List task', '2'),
        ]),
    ];

    useEffect(() => {
        if (userAdmin) {
            setActiveKey('1')
        } else {
            setActiveKey('2')
        }
    }, [userAdmin])

    // const checkUserRole = user?.groupId === 2 ? items.splice(2) : items

    const onClickItem = (item) => {
        console.log({ item })
        setActiveKey(item.key)
    }
    console.log({userAdmin})

    const logoutUser = async () => {
        await logout();
        clearUserData();
        router.push(urlPath.login)
    }

    return (
        <div className={styles.container}>
            <Menu
                onClick={onClickItem}
                style={{
                    width: 256,
                }}
                mode="inline"
                selectedKeys={[activeKey]}
                defaultOpenKeys={['sub1', 'sub4']}
                items={items}
            />
            <div className={styles.listPage}>
                {activeKey === '1' ? (
                    <ListPageUser />
                ) : (
                    <ListTask />
                )}
            </div>
            <Button onClick={() => logoutUser()} > <LogoutOutlined /> Logout</Button>
        </div>
    )
}
export default Home;