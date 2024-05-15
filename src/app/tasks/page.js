'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './page.module.scss'
import { UnorderedListOutlined } from '@ant-design/icons';
import { checkDeadline, getTask, searchTask } from '../../service/taskService';
import { usePathname, useSearchParams } from 'next/navigation';
import { useUser } from '@/context/ProfileProvider';
import { handelGetListUser } from '@/service/userService';
import { cleanObject, convertSearchParamsToObject } from '@/utils';
import TableTask from './tableTask';
import dayjs from 'dayjs';
import { commonStatus } from '@/constant/constant';

const ListTask = () => {
    const [data, setData] = useState([]);
    const { user } = useUser();
    const id = user?.id
    const groupId = user?.groupId;
    const [userData, setUserData] = useState();
    const [reloadData, setReloadData] = useState(false);
    const [totalElement, setTotalElement] = useState();
    const size = 5;
    const searchParams = useSearchParams()
    const paramsObject = useMemo(() => {
        return convertSearchParamsToObject(searchParams);
    }, [searchParams])
    const [taskDeadline, setTaskDeadline] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    const dataBody = cleanObject({
                        userId: id,
                        groupId: groupId,
                        // page: queryPage ? queryPage : 1,
                        // size: +querySize ? +querySize : +size,
                        taskTitle: paramsObject.taskTitle ? paramsObject.taskTitle : '',
                        reporter: paramsObject.reporter ? +paramsObject.reporter : null
                    });
                    const response = await getTask(dataBody);
                    setData(response.data.data.content);
                    setTotalElement(response.data.data.totalRows)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [user, reloadData, paramsObject])

    useEffect(() => {
        const fetchDataUser = async () => {
            await handelGetListUser().then(res => {
                setUserData(res.data.data.content)
            })
        }
        fetchDataUser()
    }, [])

    const checkTasksNearDeadline = (tasks) => {
        const nowDate = dayjs();
        return tasks.filter(task => {
            if (task.status === commonStatus.PROGRESS) {
                const completedDay = dayjs(task.completedDate);
                const hourDiff = completedDay.diff(nowDate, 'hour', true);
                if (completedDay.isSame(nowDate, 'day')) {
                    return hourDiff >= 0.3333333333333333 && hourDiff <= 0.5;
                }
            }
        });
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const nearDeadlineTasks = checkTasksNearDeadline(data);
                if (nearDeadlineTasks && nearDeadlineTasks.length > 0) {
                    setTaskDeadline(nearDeadlineTasks);
                    const taskIds = nearDeadlineTasks.map(item => item.id);
                    const bodyData = {
                        id: [...taskIds],
                        userId: user.id,
                    };
                    await checkDeadline(bodyData);
                }
            } catch (error) {
                console.error('Error occurred in interval function:', error);
            }
        }, 180000);
    
        return () => clearInterval(interval);
    }, [taskDeadline]);


    return (
        <div className={styles.container}>
            <h1><UnorderedListOutlined /> List Task Manager</h1>
            <div className={styles.tableTask}>
                <TableTask
                    data={data}
                    setReloadData={setReloadData}
                    userData={userData}
                    totalElement={totalElement}
                    // queryPage={queryPage}
                    // querySize={querySize}
                    reloadData={reloadData}
                    size={size}
                />
            </div>
        </div>
    )
}
export default ListTask