import { Button, Table, Tag } from "antd";
import dayjs from "dayjs";
import styles from './TimeFrameTaskTable.module.scss'
import { useMemo, useState } from "react";
import SearchField from "@/component/SearchField/SearchField";
import { DATETIME_FORMAT_DISPLAY, commonStatus } from "@/constant/constant";
import { updateStatus } from "@/service/taskService";

const TimeFrameTaskTable = ({
    dataProgress,
    setReloadData,
    userData,
}) => {
    const [listTaskKey, setListTaskKey] = useState([])
    const [listTaskCompleted, setListTaskCompleted] = useState([])
    const isTaskCompleted = listTaskCompleted.some(item => item.status === commonStatus.COMPLETED)

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setListTaskKey(selectedRowKeys)
            setListTaskCompleted(selectedRows)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    const filterData = useMemo(() => {
        const dataRender = dataProgress.filter(item => item.status === commonStatus.PROGRESS)
        return dataRender;
    }, [dataProgress])

    const handelCancelTask = async () => {
        const bodyData = {
            id: listTaskKey,
            status: commonStatus.PENDING
        }
        await updateStatus(bodyData)
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
                    return reporterData.name
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
            render: (owner) => <span>{owner}</span>
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
            render: (text) => <span>{dayjs(text).format(DATETIME_FORMAT_DISPLAY)}</span>,
            width: 300
        },
        {
            title: 'Completed Date',
            dataIndex: 'completedDate',
            key: 'completedDate',
            render: completedDate => {
                const currentDate = dayjs(new Date())
                const textDate = dayjs(completedDate)
                const isCheckExpiredTime = textDate < currentDate
                return (
                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                        <span>{dayjs(completedDate).format(DATETIME_FORMAT_DISPLAY)}</span>
                        <span 
                            style={{color:'#ff4d4f'}}
                        >
                            {isCheckExpiredTime && 'Completion deadline exceeded'}
                        </span>
                    </div>
                )
            },
            width: 300
        }, 
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <Tag color="blue">{status}</Tag>,
            width: 300
        },
    ];

    const handelTaskCompleted = async() => {
        const bodyData = {
            id: listTaskKey,
            status: commonStatus.COMPLETED,
        }
        setReloadData(prevFlag => !prevFlag)
        await updateStatus(bodyData)
    }

    return (
        <>
            <SearchField
                queryName={'isCompleted'}
            />
            <div className={styles.btnAction}>
                <Button 
                    danger 
                    onClick={handelCancelTask} 
                    disabled={isTaskCompleted || listTaskKey.length < 1 }
                >
                    Cancel
                </Button>
                <Button 
                    type="primary" 
                    disabled={listTaskKey.length < 1} 
                    onClick={handelTaskCompleted} >
                        Completed
                </Button>
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
                                    background: checkCompletedTask && '#e37460',
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