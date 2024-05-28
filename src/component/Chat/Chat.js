import React, { useState } from 'react';
import { Avatar, Popover } from 'antd';
import { LeftOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import styles from './Chat.module.scss'
import SearchField from '../SearchField/SearchField';
import { useListUsers } from '@/context/UsersProvider';


const ChatPopup = () => {
    const {users} = useListUsers();
    const [isCheckBoxChat, setIsCheckBoxChat] = useState(false)

    const content = (
        <div className={styles.content}>
            {isCheckBoxChat ? (
                <div className={styles.content}>
                    <LeftOutlined onClick={() => setIsCheckBoxChat(pre => !pre)}/>
                    <div className={styles.header}>
                    </div>
                </div>
            ) : (
                <React.Fragment>
                    <SearchField />
                    <div className={styles.list}>
                        {users?.map((user, index) => {
                            return (
                                <div key={index} className={styles.item} onClick={() => setIsCheckBoxChat(pre => !pre)}>
                                    {user.avatar ? (
                                        <Avatar src={`http://localhost:3005/${user.avatar}`} />
                                    ) : (
                                        <Avatar icon={<UserOutlined />} />
                                    )}
                                    <span>{user.email}</span>
                                </div>
                            )
                        })}
                    </div>
                </React.Fragment>
            )}
        </div>
    );

    return (
        <Popover content={content} trigger="click" placement="leftBottom">
            <MenuOutlined className={styles.icon}/>
        </Popover>
    )
}
    
export default ChatPopup;