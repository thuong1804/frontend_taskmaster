'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss'
import {  UnorderedListOutlined } from '@ant-design/icons';
import {  getTask, searchTask } from '../../service/taskService';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@/context/ProfileProvider';
import { handelGetListUser } from '@/service/user-service';
import TableTask from './tableTask';
import TimeFrameTaskTable from './timeFrameTaskTable';
import ModalShowListTask from './ModalShowListTask/ModalShowListTask';

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
    const queryPage = searchParams.get('page')
    const querySize = searchParams.get('size')
    const queryTaskTitle = searchParams.get('taskTitle')
    const [search, setSearch] = useState([])

    useEffect(() => {
        const fetchSearch = async () => {
            try {
                const dataBody = {
                    taskTitle: queryTaskTitle ? queryTaskTitle : ''
                };
                const response = await searchTask(dataBody);
                setSearch(response.data.data.content);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSearch();
    }, [queryTaskTitle])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    const dataBody = {
                        userId: id,
                        groupId: groupId,
                        // page: queryPage ? queryPage : 1,
                        // size: +querySize ? +querySize : +size
                    };
                    const response = await getTask(dataBody);
                    setData(response.data.data.content);
                    setTotalElement(response.data.data.totalRows)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user, reloadData])

    useEffect(() => {
        const fetchDataUser = async () => {
            await handelGetListUser().then(res => {
                setUserData(res.data.data.content)
            })
        }
        fetchDataUser()
    }, [])


    return (
        <div className={styles.container}>
            <h1><UnorderedListOutlined /> List Task Manager</h1>
            <div className={styles.tableTask}>
                <TableTask
                    data={queryTaskTitle ? search : data}
                    setReloadData={setReloadData}
                    userData={userData}
                    totalElement={totalElement}
                    queryPage={queryPage}
                    querySize={querySize}
                    reloadData={reloadData}
                    size={size}
                />
            </div>
            {/* <div className={styles.timeFrameTaskTable}>
                <TimeFrameTaskTable
                data={data} />
            </div> */}
        </div>
    )
}
export default ListTask