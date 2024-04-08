import { Button, Popconfirm, Table, Tag } from "antd";
import dayjs from "dayjs";
import styles from './timeFrameTaskTable.module.scss'
import { useEffect, useMemo, useState } from "react";
import { updateInCompleted, updateInProgress } from "@/service/taskService";
import SearchField from "@/component/SearchField/SearchField";
import ModalShowListTask from "./_ModalShowListTask/ModalShowListTask";
import ModalShowTaskCompleted from "./_ModalShowTaskCompleted/ModalShowTaskCompleted";

const TimeFrameTaskTable = ({
    dataProgress,
    setReloadData,
    userData,
}) => {
    const [listTaskKey, setListTaskKey] = useState([])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setListTaskKey(selectedRowKeys)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    const filterData = useMemo(() => {
        const dataRender = dataProgress.filter(item => item.isInProgress === 1)
        return dataRender;
    }, [dataProgress])

    const handelCancelTask = async () => {
        const bodyData = {
            id: listTaskKey,
            isInProgress: 0 && false,
        }
        await updateInProgress(bodyData)
        setListTaskKey([])
        setReloadData(prevFlag => !prevFlag)
    }

    const columns = [
        {
            title: 'Task Title',
            dataIndex: 'taskTitle',
            key: 'taskTitle',
            render: (text) => <a>{text}</a>,
            width: 300
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
            width: 200
        },
        {
            title: 'Owner',
            dataIndex: ['User', 'name'],
            key: 'userId',
            width: 200,
            render: (text) => <Tag color='geekblue'>{text}</Tag>
        },
        {
            title: 'Task Description',
            dataIndex: 'taskDescription',
            key: 'taskDescription',
            width: 300
        },
        {
            title: 'Schedule Date',
            dataIndex: 'scheduledDate',
            key: 'scheduledDate',
            render: (text) => <span>{dayjs(text).format('DD-MM-YYYY')}</span>,
            width: 300
        },
        {
            title: 'Completed Date',
            dataIndex: 'completedDate',
            key: 'completedDate',
            render: (text) => <span>{dayjs(text).format('DD-MM-YYYY')}</span>,
            width: 300
        },
        {
            title: 'Completed',
            dataIndex: 'isCompleted',
            key: 'isCompleted',
            render: (isCompleted) => <Tag color={isCompleted === 1 ? 'green' : 'red'}>{isCompleted === 1 ? 'Finished' : 'Unfinished'}</Tag>,
            width: 300
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     width: 150,
        //     render: (_, record) => (
        //         <Button  type="primary">Edit</Button>
        //     ),
        // },
    ];

    const handelTaskCompleted = async() => {
        const bodyData = {
            id: listTaskKey,
            isCompleted: 1 ? true : false,
        }
        setReloadData(prevFlag => !prevFlag)
        await updateInCompleted(bodyData)
    }

    return (
        <>
            <SearchField
                queryName={'isCompleted'}
            />
            <div className={styles.btnAction}>
                <ModalShowTaskCompleted />
                <Button danger onClick={handelCancelTask} disabled={listTaskKey.length < 1}>
                    Cancel
                </Button>
                <Button type="primary" disabled={listTaskKey.length < 1} onClick={handelTaskCompleted} >Completed</Button>
            </div>
            <Table
                rowKey={'id'}
                rowSelection={{
                    selectedRowKeys: listTaskKey,
                    type: 'checkbox',
                    ...rowSelection,
                    hideSelectAll: true
                }}
                columns={columns}
                dataSource={filterData}
                onRow={(record, index) => {
                    const checkInProgress = record.isInProgress === 1 && record.isCompleted === 0;
                    const recordDate = new Date(record.completedDate);
                    if (checkInProgress) {
                        const nowDay = new Date();
                        const checkCompletedTask =  dayjs(recordDate).isBefore(nowDay)
                        return (
                            ({
                                style: {
                                    background: checkCompletedTask && '#e37460'
                                }
                            })
                        )
                    }
                }}
                pagination={{
                    pageSize: 7
                }}
            />
        </>

    )
}
export default TimeFrameTaskTable;