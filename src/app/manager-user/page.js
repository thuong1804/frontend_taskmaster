'use client'
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { handelDeleteUser, handelGetListUser } from "../service/user-service";
import { UserAddOutlined, EditOutlined, UserDeleteOutlined, UserOutlined } from "@ant-design/icons";
import styles from './page.module.scss'
import { useRouter } from "next/navigation";
import urlPath from "../constant/path";

const ListPageUser = () => {
    const [data, setData] = useState([])
    const router = useRouter();
    const [userID, setUserID] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await handelGetListUser().then(res => {
                if (res.data.result) {
                    setData(res.data.data.content)
                }
            })
        }
        fetchData();
    }, [])

    const confirm = async (e) => {
        await handelDeleteUser(userID)
    };
    const cancel = (e) => {
        console.log(e);
    };

    const columns = [
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
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Gender',
            key: 'gender',
            dataIndex: 'gender',
            render: (tags) => {
                let color = tags === '1' ? 'geekblue' : 'green';
                const renderName = tags === '1' ? 'Male' : 'Female'
                return (
                    <Tag color={color} key={renderName}>
                        {renderName}
                    </Tag>
                )
            }
        },
        {
            title: 'Group',
            dataIndex: ['Group', 'name'],
            key: 'groupId',
        },
        {
            title: 'Action',
            key: 'action',
            width: 200,
            render: (_, record) => {
                return (
                    <Space size="middle">
                        <Button type="primary" onClick={() => router.push(`${urlPath.formEditUser}/${record.id}`)}>
                            <EditOutlined /> </Button>
                        <Popconfirm
                            title="Delete the user"
                            placement="topRight"
                            description="Are you sure to delete this user?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger onClick={() => setUserID(record.id)}><UserDeleteOutlined /></Button>
                        </Popconfirm>
                    </Space>
                )
            },
        },
    ];

    return (
        <div className={styles.container}>
            <h1> <UserOutlined /> List User Manager</h1>
            <div className={styles.btnAddUser} >
                <Button type="primary" onClick={() => { router.push(urlPath.signUp) }}>
                    <UserAddOutlined /> Add new user!
                </Button>
            </div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}
export default ListPageUser