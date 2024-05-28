'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './page.module.scss'
import { UnorderedListOutlined } from '@ant-design/icons';
import { checkDeadline, getTask } from '../../service/taskService';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@/context/ProfileProvider';
import { cleanObject, convertSearchParamsToObject } from '@/utils';
import TableTask from './tableTask';
import dayjs from 'dayjs';
import { commonStatus } from '@/constant/constant';
import { useListUsers } from '@/context/UsersProvider';

const ListTask = () => {
    const [data, setData] = useState([]);
    const { user } = useUser();
    const {users} = useListUsers();
    const id = user?.id
    const groupId = user?.groupId;
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
                    const shouldIncludeOwner = groupId !== 1 || (groupId === 1 && paramsObject.owner);
                    const dataBody = cleanObject({
                        userId: id,
                        groupId: groupId,
                        taskTitle: paramsObject.taskTitle ? paramsObject.taskTitle : '',
                        reporter: paramsObject.reporter ? +paramsObject.reporter : null,
                        owner: shouldIncludeOwner ? +paramsObject.owner : undefined,
                        status: paramsObject.status ? paramsObject.status : undefined,
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
                    userData={users}
                    totalElement={totalElement}
                    reloadData={reloadData}
                    size={size}
                />
            </div>
        </div>
    )
}
export default ListTask