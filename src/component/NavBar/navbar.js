'use client'
import { AppstoreOutlined, SolutionOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import styles from './navbar.module.scss'
import urlPath from "@/constant/path";
import Link from "next/link";
import { useEffect, useState } from "react";

const childrenKey = {
    user: urlPath.manageUser,
    task: urlPath.task,
}

const NavBarLayout = ({user}) => {
    const pathname = usePathname();
    const [selectedKeys, setSelectedKeys] = useState();
    const [openKeys, setOpenKeys] = useState(pathname === urlPath.home ? '' : pathname === childrenKey.user ? ['sub1'] : ['sub2']);
   
    const handleSubMenuOpenChange = openKeys => {
        setOpenKeys(openKeys);
    };

    const items = [
        {
            label: 'Manager Users',
            key: 'sub1',
            icon: <SolutionOutlined />,
            children: [
                {
                    key: childrenKey.user,
                    label: <Link href={urlPath.manageUser} passHref>List user</Link>,
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
                    label: <Link href={urlPath.task} passHref>List task</Link>
                }
            ]
        }
    ];

    useEffect(() => {
        if (pathname === urlPath.home) {
            return setSelectedKeys('')
        }
        if (pathname.includes(childrenKey.user) || pathname.split('/').length === 3) {
            setSelectedKeys(childrenKey.user);
        } else {
            setSelectedKeys(childrenKey.task);
        }

    }, [pathname]);

    const dataNav = items.filter(nav => {
        if (user?.groupId !== 1) return !nav.disabled
        return nav
    })

    return (
        <div className={styles.container}>
            <Menu
                theme={'light'}
                style={{
                    width: "100%",
                    minWidth: 256,
                }}
                defaultOpenKeys={openKeys}
                selectedKeys={[selectedKeys]}
                mode="inline"
                onOpenChange={handleSubMenuOpenChange}
                items={dataNav}
            />
        </div>

    )
}
export default NavBarLayout;