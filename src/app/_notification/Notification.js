import { Badge, Popover } from 'antd';
import styles from './Notification.module.scss'
import { BellOutlined} from '@ant-design/icons';
import ItemNotification from './ItemNotification';
import { useNotification } from '@/context/NotificationProvider';

const Notification = () => {
    const {itemNotifications} = useNotification()
    const countNotification = itemNotifications?.filter(item => {
        return !item.seen
    }).length
   
    const items = (
        <ItemNotification 
            itemNotifications={itemNotifications}
        />
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
                        <Badge count={countNotification}>
                            <BellOutlined style={{fontSize:'20px', color:'gray'}}/>
                        </Badge>
                    </span>
                </Popover>
        </div>
    )
}
export default Notification;