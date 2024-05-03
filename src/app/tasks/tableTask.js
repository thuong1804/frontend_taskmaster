import { deleteTask, updateStatus } from '@/service/taskService';
import { PlusOutlined, EditOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table, Tag, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react'
import { DATETIME_FORMAT_DISPLAY } from "@/constant/constant";

import dayjs from 'dayjs';
import { toast } from 'sonner';
import styles from './TableTask.module.scss'
import SearchField from '@/component/SearchField/SearchField';
import urlPath from '@/constant/path';
import ModalShowListTask from './_ModalShowListTask/ModalShowListTask';
import { commonStatus } from '@/constant/constant';
import SearchForm from '@/component/SearchForm/SearchForm';

const tabSearch = [
    {
        label: 'Task Title',
        key: 'taskTitle'
    },
    {
        label: 'Reporter',
        key: 'reporter'
    },
    {
        label: 'Owner',
        key: 'owner'
    },
    {
        label: 'Status',
        key: 'status'
    },
]

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
        const dataRender = data.filter(item => item.status === commonStatus.PENDING)
        return dataRender
    }, [data])

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
            render: (id) => {
                const reporterData = userData?.find(item => item.id === id);
                if (reporterData) {
                    return reporterData.name;
                } else {
                    return null;
                }
            },
        },
        {
            title: 'Owner',
            dataIndex: ['User', 'name'],
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
            render: text => dayjs(text).format(DATETIME_FORMAT_DISPLAY)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => <Tag>{status}</Tag>
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (_, record) => (
                <div className={styles.btnAction}>
                    <Button
                        style={{ background: '#f4a62a', color: 'white' }}
                        onClick={() => router.push(`${urlPath.formTask}/${record.id}`)}>
                        <EditOutlined /> Edit
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
                            type="primary"
                            onClick={() => setTaskID(record.id)} >
                            <MinusCircleOutlined /> Delete
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

    // const onChange = (page, pageSize) => {
    //     const url = `page=${page}&size=${+querySize ? +querySize : +size}`
    //     router.replace(`${pathname}?${url}`)
    // }

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
                        searchField = {[
                            {
                                key: 'taskTitle',
                                placeHoder: 'Task Title'
                            },
                            {
                                key: 'reporter',
                                placeHoder: 'Reporter'
                            },
                            {
                                key: 'owner',
                                placeHoder: 'Owner'
                            },
                            {
                                key: 'status',
                                placeHoder: 'Status'
                            }
                        ]}
                     />
            </div>
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
            {/* <div className={styles.pagination}>
                <Pagination
                defaultCurrent={queryPage}
                total={totalElement}
                onChange={onChange}
                pageSize={5}
            />
            </div> */}
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
    )
}
