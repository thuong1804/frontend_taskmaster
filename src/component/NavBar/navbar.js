'use client';

import { AppstoreOutlined, SolutionOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import styles from './navbar.module.scss'
import { useUser } from "../../context/ProfileProvider";
import urlPath from "@/constant/path";
import Link from "next/link";

const childrenKey = {
    user: urlPath.manageUser,
    task: urlPath.task,
}

const NavBarLayout = () => {
    const { push } = useRouter()
    const pathname = usePathname();
    const {user} = useUser();

    const items = [
        {
            label: 'Manager Users',
            key: 'sub1',
            icon: <SolutionOutlined />,
            children: [
                {
                    key: childrenKey.user,
                    label: <Link href={urlPath.manageUser} passHref>user</Link>,
                    // disabled: user?.groupId !== 1,
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
                    label: <Link href={urlPath.task} passHref>task</Link>
                }
            ]
        }
    ];

    console.log('reload')

    return (
        <div className={styles.container}>
            <Menu
                theme={'light'}
                style={{
                    width: "100%",
                    minWidth: 256,
                }}
                defaultOpenKeys={['sub1', 'sub2']}
                selectedKeys={pathname === childrenKey.user ? childrenKey.user : childrenKey.task}
                mode="inline"
                items={items}
            />
        </div>

    )
}
export default NavBarLayout;