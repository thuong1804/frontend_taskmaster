'use client';
import { useEffect, useState } from 'react';
import styles from './list.module.scss'
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { getTask } from '../service/taskService';
import { Button, Space, Table, Tag } from 'antd';
import { useRouter } from 'next/navigation';
import urlPath from '../constant/path';

const ListTask = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getTask().then((res) => {
                    setData(res.data.data.content);
                    setInitLoading(false);
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])

    const columns = [
        {
          title: 'Task Title',
          dataIndex: 'taskTitle',
          key: 'taskTitle',
          render: (text) => <a>{text}</a>,
          width: 300
        },
        {
          title: 'Task Description',
          dataIndex: 'taskDescription',
          key: 'taskDescription',
          width: 300
        },
        {
          title: 'Schedule Date',
          dataIndex: 'scheduleDate',
          key: 'scheduleDate',
          width: 300
        },
        {
            title: 'Completed Date',
            dataIndex: 'completedDate',
            key: 'scheduleDate',
            width: 300
          },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          render: (_, record) => (
            <Space size="middle">
              <a>Edit</a>
              <a>Delete</a>
            </Space>
          ),
        },
      ];

    return (

        <div className={styles.container}>
            <h1><UnorderedListOutlined /> List Task Manager</h1>
            <div className={styles.list}>
                <div className={styles.btnAdd}>
                <Button type='primary' onClick={() => router.push(urlPath.addTodo)}><PlusOutlined /> Add task</Button>
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}
export default ListTask