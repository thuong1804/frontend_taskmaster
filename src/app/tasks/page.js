'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';

import { convertSearchParamsToObject } from '@/utils';
import { checkDeadline, deleteTask, getTask } from '../../service/taskService';
import { commonStatus, DATETIME_FORMAT_DISPLAY, TYPE } from '@/constant/constant';
import { useListUsers } from '@/context/UsersProvider';
import ListContainer from '@/component/ListContainer';
import { useUser } from '@/context/ProfileProvider';
import { Button, Tag } from 'antd';
import urlPath from '@/constant/path';
import { statusDDL } from '@/constant/masterData';

import styles from './page.module.scss'
import ModalShowListTask from './_modal-show-list-task/ModalShowListTask';
import TableTask from './tableTask';

const ListTask = () => {
    const [data, setData] = useState([])
    const { user } = useUser();
    const { users } = useListUsers();
    const id = user?.id
    const groupId = user?.groupId;
    const searchParams = useSearchParams()
    const paramsObject = useMemo(() => {
        return convertSearchParamsToObject(searchParams);
    }, [searchParams])
    const [taskDeadline, setTaskDeadline] = useState([])
    const shouldIncludeOwner = groupId !== 1 || (groupId === 1 && paramsObject.owner);

    const ddlListUser = users?.map(item => {
        return {
            value: item.id,
            label: item.name
        }
    })

    const columns = [
        {
            title: 'Task Title',
            dataIndex: 'taskTitle',
            key: 'taskTitle',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Reporter',
            dataIndex: 'reporter',
            key: 'reporter',
            render: (reporterId) => {
                const reporterData = users?.find(item => item.id === reporterId);
                if (reporterData) {
                    return reporterData.name;
                } else {
                    return null;
                }
            },
        },
        {
            title: 'Owner',
            key: 'owner',
            dataIndex: 'owner',
            render: (ownerId) => {
                const ownerData = users?.find(item => item.id === ownerId);
                if (ownerData) {
                    return ownerData.name;
                } else {
                    return null;
                }
            },
        },
        {
            title: 'Task Description',
            dataIndex: 'taskDescription',
            key: 'taskDescription',
        },
        {
            title: 'Schedule Date',
            dataIndex: 'scheduledDate',
            key: 'scheduleDate',
            render: text => dayjs(text).format(DATETIME_FORMAT_DISPLAY)
        },
        {
            title: 'Completed Date',
            dataIndex: 'completedDate',
            key: 'completedDate',
            render: completedDate => dayjs(completedDate).format(DATETIME_FORMAT_DISPLAY)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status =>
                <Tag
                    color={status === commonStatus.COMPLETED && 'green'}>
                    {status}
                </Tag>
        },
    ];

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

    const onGetListSuccess = (res) => {
        setData(res)
    }

    const handelTaskProgress = async () => {
        const bodyData = {
            id: keyIdTaskProgress,
            status: commonStatus.PROGRESS
        }
        await updateStatus(bodyData)
        setKeyIdTaskProgress([])
        setReloadData(prevFlag => !prevFlag)
        toast.success(`Select ${titleTask} success`)
    }

    return (
        <>
            <ListContainer
                columns={columns}
                getListAction={getTask}
                title='List task manager'
                objectName='task'
                onGetListSuccess={onGetListSuccess}
                searchFields={[
                    {
                        key: 'taskTitle',
                        searchPlaceholder: 'Task Title',
                        fieldType: TYPE.TEXT,
                    },
                    {
                        key: 'reporter',
                        searchPlaceholder: 'Reporter',
                        fieldType: TYPE.SELECT,
                        options: ddlListUser,
                    },
                    {
                        key: 'owner',
                        searchPlaceholder: 'Owner',
                        fieldType: TYPE.SELECT,
                        options: ddlListUser,
                        disabled: groupId !== 1

                    },
                    {
                        key: 'status',
                        searchPlaceholder: 'Status',
                        fieldType: TYPE.SELECT,
                        options: statusDDL,
                    },
                ]}
                formUrl={urlPath.formTask}
                actionButtons={{
                    isEdit: true,
                    isDelete: true,
                }}
                deleteAction={deleteTask}
                filterParams={{
                    userId: id,
                    groupId: groupId,
                    taskTitle: paramsObject.taskTitle ? paramsObject.taskTitle : '',
                    reporter: paramsObject.reporter ? +paramsObject.reporter : null,
                    owner: shouldIncludeOwner ? +paramsObject.owner : undefined,
                    status: paramsObject.status ? paramsObject.status : undefined,
                }}
            />
             <TableTask
                    data={data}
                    userData={users}
            />
        </>
    )
}
export default ListTask