"use client"

import { Button, Menu } from 'antd';
import styles from './home.module.scss'
import { useRouter } from 'next/navigation'
import urlPath from '../constant/path';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import ListPageUser from '../manager-user/page';

const Home = () => {
    const onClick = (e) => {
        console.log('click ', e);
      };
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
        getItem('User-Manager', 'sub1', <MailOutlined />, [
            getItem('Item 1', 'g1', null, [getItem('Option 1', '1')], 'group'),
        ]),
        {
            type: 'divider',
        },
        getItem('User', 'sub4', <SettingOutlined />, [
            getItem('Option 9', '9'),
        ]),
    ];
    const router = useRouter();
    return (
        <div className={styles.container}>
            <Menu
                onClick={onClick}
                style={{
                    width: 256,
                }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
            <ListPageUser />

        </div>
    )
}
export default Home;