'use client'
import { AppstoreOutlined, BarChartOutlined, SolutionOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { usePathname } from "next/navigation";
import styles from './Navbar.module.scss'
import urlPath from "@/constant/path";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from '@/context/ProfileProvider'

const childrenKey = {
    user: urlPath.user,
    task: urlPath.task,
    assess: urlPath.assess,
}

const NavBarLayout = () => {
    const pathname = usePathname();
    const [selectedKeys, setSelectedKeys] = useState();
    const [openKeys, setOpenKeys] = useState(pathname === urlPath.home 
        ? '' : pathname === childrenKey.user ? ['sub1'] : pathname === childrenKey.task === childrenKey.task ? ["sub2"] : ["sub3"]);
    const {user} = useUser()
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
                    label: <Link href={urlPath.user} passHref>List user</Link>,
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
        },
        {
            label: 'Manager Assess',
            key: 'sub3',
            icon: <BarChartOutlined />,
            children: [
                {
                    key: childrenKey.assess,
                    label: <Link href={urlPath.assess} passHref> assess</Link>
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
        } else if (pathname.includes(childrenKey.task)) {
            setSelectedKeys(childrenKey.task);
        } else {
            setSelectedKeys(childrenKey.assess);

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