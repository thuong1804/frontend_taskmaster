'use client';

import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import styles from './navbar.module.scss'
import { useUser } from "../context/ProfileProvider";

const childrenKey = {
    user: '/manager-user',
    task: '/task',
}

const NavBarLayout = () => {
    const { push } = useRouter()
    const pathname = usePathname();
    const {user} = useUser();

    const items = [
        {
            label: 'Manager Users',
            key: 'sub1',
            icon: <MailOutlined />,
            children: [
                {
                    key: childrenKey.user,
                    label: 'List users',
                    disabled: user?.groupId !== 1,
                }
            ],
            disabled: user?.groupId !== 1,
        },
        {
            label: 'Manager Tasks',
            key: 'sub2',
            icon: <AppstoreOutlined />,
            children: [
                {
                    key: childrenKey.task,
                    label: 'List task'
                }
            ]
        }
    ];

    const onClick = (e) => {
        push(e.key)
    };

    return (
        <div className={styles.container}>
            <Menu
                theme={'light'}
                onClick={onClick}
                style={{
                    width: 256,
                }}
                defaultOpenKeys={pathname === '/manager-user' ? ['sub1'] : ['sub2']}
                selectedKeys={pathname === childrenKey.user ? childrenKey.user : childrenKey.task}
                mode="inline"
                items={items}
            />
        </div>

    )
}
export default NavBarLayout;