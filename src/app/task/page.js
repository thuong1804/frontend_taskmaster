'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.scss'
import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { deleteTask, getTask } from '../../service/taskService';
import { Button, Pagination, Popconfirm, Space, Table, Tag } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import urlPath from '../../constant/path';
import { useUser } from '@/component/context/ProfileProvider';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import { handelGetListUser } from '@/service/user-service';

const ListTask = () => {
    const [data, setData] = useState([]);
    const [taskID, setTaskID] = useState([]);
    const router = useRouter();
    const searchParams = useSearchParams()
    const search = searchParams.get('todo-list')
    const { user } = useUser();
    const id = user?.id
    const groupId = user?.groupId;
    const [userData, setUserData] = useState();
    const [reloadData, setReloadData] = useState(false);
    const [totalPages, setTotalPages] = useState();
    const size = 5;
    const [currentPage, setCurrentPage] = useState(1);


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

    console.log({search})

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    const dataBody = {
                        userId: id,
                        groupId: groupId,
                        page: currentPage,
                        size: +size
                    };
                    const response = await getTask(dataBody);
                    setData(response.data.data.content);
                    setTotalPages(response.data.data.totalPages);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [reloadData, id, groupId, currentPage, user])

    useEffect(() => {
        const fetchDataUser = async () => {
            await handelGetListUser().then(res => {
                setUserData(res.data.data.content)
            })
        }
        fetchDataUser()
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
            title: 'Action',
            key: 'action',
            width: 150,
            render: (_, record) => (
                <div className={styles.btnAction}>
                    <button className={styles.btnEdit} onClick={() => router.push(`${urlPath.formTodo}/${record.id}`)}>Edit</button>

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
    const onChange = (page, pageSize) => {
        setCurrentPage(page)
    }

    return (
        <div className={styles.container}>
            <h1><UnorderedListOutlined /> List Task Manager</h1>
            <div className={styles.list}>
                <div className={styles.btnAdd}>
                    <Button type='primary' onClick={() => router.push(urlPath.formTodo)}><PlusOutlined /> Add task</Button>
                </div>
                <Table columns={columns} dataSource={data}  pagination={false} rowKey="id"/>
                <div className={styles.pagination}>
                    <Pagination defaultCurrent={currentPage} total={totalPages * 10 || 30} onChange={onChange} size={size}/>
                </div>
            </div>
        </div>
    )
}
export default ListTask