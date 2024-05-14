import { Badge, Dropdown, Popover } from 'antd';
import styles from './Notification.module.scss'
import { BellOutlined} from '@ant-design/icons';
import Profile from '../_profile/page';
import ItemNotification from './ItemNotification';
import { useUser } from '@/context/ProfileProvider';
import { useEffect, useState } from 'react';
import { notifications } from '@/service/notificationService';

const Notification = () => {
    
    const { user } = useUser();
    const [itemNotifications, setItemNotfications] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await notifications(user.id).then(res => {
                if (res.data.result) {
                    setItemNotfications(res.data.data.content)
                }
            })
        }
        fetchData();
    }, [])

    const items = (
        <ItemNotification itemNotifications={itemNotifications}/>
    )

    return (
        <div className={styles.notitfication}>
                <Popover
                    overlayClassName={styles.popover}
                    content={items}
                    trigger="click"
                    placement="bottomRight"
                >   
                     <span>
                        <Badge count={itemNotifications.length}>
                            <BellOutlined  style={{fontSize:'20px', color:'gray'}}/>
                        </Badge>
                    </span>
                </Popover>
        </div>
    )
}
export default Notification;