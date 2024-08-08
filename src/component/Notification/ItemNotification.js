import { BellOutlined } from '@ant-design/icons';
import styles from './ItemNotification.module.scss';
import { DATETIME_FORMAT_DISPLAY } from '@/constant/constant';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useUser } from '@/context/ProfileProvider';
import { useNotification } from '@/context/NotificationProvider';

const ItemNotification = () => {
    const {user} = useUser();
    const {itemNotifications, handelReadAll, handelReadOne} = useNotification()
    const isNodata = itemNotifications?.length === 0;

    return (
        <div className={classNames(styles.container, {
            [styles.noData]: isNodata,
        })}>
            <h3>Notification</h3>
            {!isNodata && (
                <div className={styles.readAll}>
                    <span onClick={() => handelReadAll(user.id)}>Read all</span>
                </div>
           )} 
            {itemNotifications?.map((item, key) => {
                return (
                    <div
                        className={styles.box}
                        key={key}
                        onClick={() => handelReadOne(item.id, item.link)}
                    >
                        <div className={styles.content}>
                            <span>{item?.name}</span>
                            <span>{item?.description}</span>
                            <span>
                                {item.date ? dayjs(item?.date).format(DATETIME_FORMAT_DISPLAY) : null}
                            </span>
                        </div>
                       {!item.seen && (
                            <span className={styles.point}></span>
                       )}
                    </div>
                )
            }).reverse()}
            {isNodata && (
                <div className={styles.contentNodata}>
                    <BellOutlined />
                    <span>No notification yet</span>
                </div>
            )}
        </div>
    )
}
export default ItemNotification;