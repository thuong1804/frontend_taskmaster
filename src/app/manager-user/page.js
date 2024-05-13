'use client'
import { Avatar, Button, Popconfirm, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { handelDeleteUser, handelGetListUser } from "../../service/user-service";
import { EditOutlined, UserDeleteOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import styles from './page.module.scss'
import { useRouter } from "next/navigation";
import urlPath from "../../constant/path";
import { toast } from "sonner";
import Skeletons from "@/component/Skeleton";
import dayjs from "dayjs";
import { DATETIME_FORMAT_DISPLAY, DATETIME_FORMAT_VALUE } from "@/constant/constant";
import Image from "next/image";

const ListPageUser = () => {
    const [data, setData] = useState([])
    const router = useRouter();
    const [userID, setUserID] = useState([]);
    const [reloadData, setReloadData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await handelGetListUser().then(res => {
                if (res.data.result) {
                    setData(res.data.data.content)
                }
            })
        }
        fetchData();
    }, [reloadData])

    const confirm = async (e) => {
        await handelDeleteUser(userID).then(res => {
            if (res.data.result) {
                toast.success('Delete user success')
                setReloadData(prevFlag => !prevFlag)
            }
        }).catch((error) => {
            if (error) {
                return toast.error('Delete user failed')
            }
        })
    };

    const cancel = (e) => {
        console.log(e);
    };

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => {
                return (
                    <Avatar
                        src={`http://localhost:3005/${avatar}`}
                        >
                            {avatar ? avatar : <UserOutlined />}
                    </Avatar>
                )
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 200
        },
        {
            title: 'Birth Day',
            dataIndex: 'birthDay',
            key: 'birthDay',
            width: 200,
            render: (date) => {
                const renderDate = dayjs(date).format(DATETIME_FORMAT_VALUE)
                return date ? renderDate : null;
            },
        },
        {
            title: 'Gender',
            key: 'gender',
            dataIndex: 'gender',
            render: (tags) => {
                let color = tags === 1 ? 'geekblue' : 'green';
                const renderName = tags === 1 ? 'Male' : 'Female'
                return (
                    <Tag color={color} key={renderName}>
                        {renderName}
                    </Tag>
                )
            },
            width: 100
        },
        {
            title: 'Group',
            dataIndex: ['Group', 'name'],
            key: 'groupId',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
            width: 200

        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 400
        },
        {
            title: 'Action',
            key: 'action',
            width: 200,
            render: (_, record) => {
                return (
                    <Space size="middle">
                        <Button 
                            type="primary" 
                            onClick={() => router.push(`${urlPath.formUser}/${record.id}`)}
                        >
                            <EditOutlined /> 
                        </Button>
                        <Popconfirm
                            title="Delete the user"
                            placement="topRight"
                            description="Are you sure to delete this user?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button 
                                danger 
                                onClick={() => { setUserID(record.id) }}>
                                    <UserDeleteOutlined />
                            </Button>
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ];


    return (
        <>
            {!data ? (
                <Skeletons className={styles.skeleton} />
            ) : (
                <div className={styles.container}>
                    <h1> <UserOutlined /> List User Manager</h1>
                    <div className={styles.FormAddNew}>
                        <Button 
                            type="primary" 
                            icon={<PlusOutlined />}
                            onClick={() => router.push(urlPath.formUser)}
                        >
                            Create a new user
                        </Button>
                    </div>
                    <Table rowKey={'id'} columns={columns} dataSource={data} />
                </div>
            )}
        </>
    )
}
export default ListPageUser