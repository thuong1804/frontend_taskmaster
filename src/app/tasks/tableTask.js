import { deleteTask, updateStatus } from '@/service/taskService';
import { PlusOutlined, EditOutlined, LineOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table, Tag } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'
import { DATETIME_FORMAT_DISPLAY, TYPE } from "@/constant/constant";

import dayjs from 'dayjs';
import { toast } from 'sonner';
import urlPath from '@/constant/path';
import { commonStatus } from '@/constant/constant';
import SearchForm from '@/component/SearchForm/SearchForm';
import ModalShowListTask from './_ModalShowListTask/ModalShowListTask';
import styles from './TableTask.module.scss'
import { statusDDL } from '@/constant/masterData';
import { handelGetListUser } from '@/service/userService';
import { useUser } from '@/context/ProfileProvider';

export default function TableTask({
    data,
    setReloadData,
    reloadData,
    userData,
}) {
    const [taskID, setTaskID] = useState([]);
    const router = useRouter();
    const [keyIdTaskProgress, setKeyIdTaskProgress] = useState([])
    const [titleTask, setTitleTask] = useState([]);
    const [listUser, setListUser] = useState([])
    const {user} = useUser();
    const {groupId} = user
    const ddlListUser = listUser?.map(item => {
        return {
            value: item.id,
            label: item.name
        }
    })

    const confirm = async (e) => {
        await deleteTask(taskID).then(res => {
            if (res.data.result) {
                toast.success('Delete task success')
                setReloadData(prevFlag => !prevFlag)
            }
        }).catch((error) => {
            if (error) {
                return toast.error('Delete task failed')
            }
        })
    };

    const cancel = (e) => {
        console.log(e);
    };

    const filterData = useMemo(() => {
        const dataRender = data.filter(item => item.status !== commonStatus.PROGRESS)
        return dataRender
    }, [data])

    useEffect(() => {
        const fetchData = async() => {
            await handelGetListUser().then(res => {
                if (res.data.data) {
                    setListUser(res.data.data.content)
                }
            })
        }
        fetchData()
    }, [])

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
                const reporterData = userData?.find(item => item.id === reporterId);
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
                const ownerData = userData?.find(item => item.id === ownerId);
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
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (_, record) => (
                <div className={styles.btnAction}>
                    <Button
                        type="primary"
                        onClick={() => router.push(`${urlPath.formTask}/${record.id}`)}
                    >
                        <EditOutlined />
                    </Button>
                    <Popconfirm
                        placement="topRight"
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            danger
                            onClick={() => setTaskID(record.id)} >
                            <LineOutlined />
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys: keyIdTaskProgress,
        onChange: (selectedRowKeys, selectedRows) => {
            setTitleTask(selectedRows.map(item => item.taskTitle))
            setKeyIdTaskProgress(selectedRowKeys);
        },
    };

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
        <div className={styles.container}>
            <div className={styles.actionFilter}>
                <SearchForm
                    searchField={[
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
                />
            </div>
            <div className={styles.contentTable}>
                <div className={styles.btnAddTask}>
                    <Button
                        type='primary'
                        onClick={() => router.push(urlPath.formTask)}>
                        <PlusOutlined /> Add task
                    </Button>
                </div>
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                        hideSelectAll: true
                    }}
                    className="table-striped-rows"
                    columns={columns}
                    dataSource={filterData}
                    rowKey="id"
                    pagination={{
                        pageSize: 6,
                    }}
                />
                <div className={styles.btnStartTask}>
                    <ModalShowListTask
                        dataProgress={data}
                        setReloadData={setReloadData}
                        userData={userData}
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

        </div>
    )
}
