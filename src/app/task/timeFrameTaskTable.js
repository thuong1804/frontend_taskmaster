import { Button, Popconfirm, Table, Tag } from "antd";
import dayjs from "dayjs";
import styles from './timeFrameTaskTable.module.scss'
import urlPath from "@/constant/path";
import { useEffect, useMemo, useState } from "react";
import { updateInProgress } from "@/service/taskService";

const TimeFrameTaskTable = ({
    dataProgress,
    setReloadData,
}) => {
    const [listTaskKey, setListTaskKey] = useState([])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setListTaskKey(selectedRowKeys)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
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
            isInProgress: 0 && false
        }
        await updateInProgress(bodyData)
        setListTaskKey([])
        setReloadData(prevFlag => !prevFlag)
    }
    console.log({listTaskKey})
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
            // render: (id) => {
            //     const reporterData = userData?.find(item => item.id === id);
            //     if (reporterData) {
            //         return <Tag color='red'>{reporterData.name}</Tag>;
            //     } else {
            //         return null;
            //     }
            // },
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
        // {
        //     title: 'Action',
        //     key: 'action',
        //     width: 150,
        //     render: (_, record) => (
        //         <div className={styles.btnAction}>
        //             <Button  danger onClick={handelCancelTask}>Cancel</Button>
        //             <Button  type="primary">Completed</Button>
        //         </div>
        //     ),
        // },
    ];

    return (
        <>
            <div className={styles.btnAction}>
                <Button danger onClick={handelCancelTask} disabled={listTaskKey.length < 1}>
                    Cancel
                </Button>
                <Button type="primary">Completed</Button>
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
                pagination={{
                }}
            />
        </>

    )
}
export default TimeFrameTaskTable;