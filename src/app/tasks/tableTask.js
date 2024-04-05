import { deleteTask, updateInCompleted, updateInProgress } from '@/service/taskService';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Pagination, Popconfirm, Space, Table, Tag } from 'antd';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'

import dayjs from 'dayjs';
import { toast } from 'sonner';
import styles from './tableTask.module.scss'
import SearchField from '@/component/SearchField/SearchField';
import urlPath from '@/constant/path';
import ModalShowListTask from './ModalShowListTask/ModalShowListTask';

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
        const dataRender = data.filter(item => item.isInProgress === 0)
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
                    return <Tag color='red'>{reporterData.name}</Tag>;
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
            render: text => dayjs(text).format('DD-MM-YYYY')
        },
        {
            title: 'Completed Date',
            dataIndex: 'completedDate',
            key: 'completedDate',
            render: text => dayjs(text).format('DD-MM-YYYY')
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <div className={styles.btnAction}>
                    <button className={styles.btnEdit} onClick={() => router.push(`${urlPath.formTask}/${record.id}`)}>Edit</button>

                    <Popconfirm
                        placement="topRight"
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className={styles.btnDelete} onClick={() => setTaskID(record.id)} >Delete</button>
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
        const currentDay = new Date();
        const bodyData = {
            id: keyIdTaskProgress,
            isInProgress: 1 ? true : false,
            scheduledDate: currentDay,
        }
        await updateInProgress(bodyData)
        setKeyIdTaskProgress([])
        setReloadData(prevFlag => !prevFlag)
        toast.success(`Select ${titleTask} success`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.actionFilter}>
                <SearchField
                    queryName={'taskTitle'}
                    objectName={'Task Title!'}
                />
                <Button
                    type='primary'
                    onClick={() => router.push(urlPath.formTask)}>
                    <PlusOutlined /> Add task</Button>
            </div>
            <Table
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                    hideSelectAll: true
                }}
                scroll={{
                    y: 400
                }}
                className="table-striped-rows"
                columns={columns}
                dataSource={filterData}
                pagination={false}
                rowKey="id"
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
