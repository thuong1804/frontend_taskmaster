'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';

import { convertSearchParamsToObject } from '@/utils';
import { checkDeadline, deleteTask, getTask, updateStatus } from '../../service/taskService';
import { commonStatus, DATETIME_FORMAT_DISPLAY, TYPE } from '@/constant/constant';
import { useListUsers } from '@/context/UsersProvider';
import ListContainer from '@/component/ListContainer';
import { useUser } from '@/context/ProfileProvider';
import { Button, Tag } from 'antd';
import urlPath from '@/constant/path';
import { statusDDL } from '@/constant/masterData';
import { toast } from 'sonner';
import ModalShowListTask from './_modal-show-list-task';

import styles from './page.module.scss'


const ListTask = () => {
    const [data, setData] = useState([])
    const [taskDeadline, setTaskDeadline] = useState([])
    const [keyIdTaskProgress, setKeyIdTaskProgress] = useState([])
    const [reloadPage, setReloadPage] = useState(false)
    const { user } = useUser();
    const { users } = useListUsers();
    const id = user?.id
    const groupId = user?.groupId;
    const searchParams = useSearchParams()
    const paramsObject = useMemo(() => {
        return convertSearchParamsToObject(searchParams);
    }, [searchParams])
    const filterData = useMemo(() => {
        return data.filter(item => item.status !== commonStatus.PROGRESS)
    }, [data])

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

   

    const onGetListSuccess = (res) => {
        setData(res)
    }

    const handelParamsFilter = useMemo(() => {
        return {
            userId: id,
            groupId: groupId,
            taskTitle: paramsObject.taskTitle ? paramsObject.taskTitle : '',
            reporter: paramsObject.reporter ? +paramsObject.reporter : null,
            owner: shouldIncludeOwner ? +paramsObject.owner : undefined,
            status: paramsObject.status ? paramsObject.status : undefined,
        }
    }, [id, groupId, paramsObject, shouldIncludeOwner, reloadPage])

    const mappingSelected = (key, selected) => {
        setKeyIdTaskProgress(key)
    }

    const handelTaskProgress = async () => {
        const bodyData = {
            id: keyIdTaskProgress,
            status: commonStatus.PROGRESS
        }
        await updateStatus(bodyData).then(res => {
            if (res.status === 200) {
                setReloadPage(pre => !pre)
                toast.success('Update status task success')
                setKeyIdTaskProgress([])
            }
        })
    }

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
            <ListContainer
                pageSize={5}
                columns={columns}
                filterData={filterData}
                getListAction={getTask}
                isSelectedField
                title='List task manager'
                objectName='task'
                onGetSelected={mappingSelected}
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
                filterParams={handelParamsFilter}
            />

            <div className={styles.actionFooter}>
                <ModalShowListTask
                    dataProgress={data}
                    userData={users}
                    setReloadPage={setReloadPage}
                    reloadPage={reloadPage}
                />
                <Button
                    type="primary"
                    ghost
                    onClick={handelTaskProgress}
                    disabled={keyIdTaskProgress.length < 1}
                >
                    Start task
                </Button>
            </div>
        </div>
    )
}
export default ListTask