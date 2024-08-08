'use client'

import React, {useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';

import { Button, Layout, theme } from 'antd';
import HeaderLayout from './HeaderLayout';

const { Header, Sider, Content } = Layout;

import Image from 'next/image';
import logoImg from '../../../public/output-logo.png'
import classNames from 'classnames';
import NavBarLayout from './NavBar';
import Loading from '../Loading';
import { useUser } from '@/context/ProfileProvider';
import { Footer } from 'antd/es/layout/layout';
import { usePathname } from 'next/navigation';
import FooterLayout from './FooterLayout';

import styles from './MasterLayout.module.scss'

const MasterLayout = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);
    const {user} = useUser();
    const pathname = usePathname();
    const splitTest = pathname.split('/')
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    if(!user)
    return <div className={classNames(styles.wrapperContainer, styles.loading)}><Loading/></div>

    return (
        <Layout style={{height:'100%'}}>
            <Sider trigger={null} 
                collapsible collapsed={collapsed} 
                theme='light'
            >
                {!collapsed ? (
                    <div className={styles.logo}>
                        <Image src={logoImg} width={60} height={60} alt='background' className={styles.imglogo} />
                        <span>TASK MASTER</span>
                    </div>
                ) : (
                    <div className={classNames(styles.logo, styles.logoCollapsed)}>
                        <Image src={logoImg} width={60} height={60} alt='background'/>
                    </div>
                )}
                
                <NavBarLayout/>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent:'space-between'
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div style={{paddingRight:'10px'}}> <HeaderLayout/> </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow:'auto'
                    }}
                >
                    {children}
                </Content>
                {splitTest.length > 2 && (
                    <Footer
                    style={{
                        margin: '10px 16px',
                        padding: '20px 20px',
                        minHeight: 80,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        background:'#ffffff',
                        display:'flex',
                        justifyContent:'flex-end'
                    }}
                >
                    <FooterLayout />
                </Footer>
                )}
            </Layout>
        </Layout>
    );
};
export default MasterLayout;