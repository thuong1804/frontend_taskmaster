import styles from './ItemNotification.module.scss';
import { DATETIME_FORMAT_DISPLAY } from '@/constant/constant';
import dayjs from 'dayjs';

const ItemNotification = ({itemNotifications}) => {

    return (
        <div className={styles.container}>
            <h3>Notification</h3>
            {itemNotifications.map((item, key) => {
                return (
                    <div className={styles.box} key={key}>
                        <div className={styles.content}>
                            <span>{item?.name}</span>
                            <span>{item?.description}</span>
                            <span>
                                {dayjs(item?.date).format(DATETIME_FORMAT_DISPLAY)}
                            </span>
                        </div>
                        <span className={styles.point}></span>
                    </div>
                )
            })}
        </div>
    )
}
export default ItemNotification;