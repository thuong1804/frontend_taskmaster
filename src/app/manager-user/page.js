'use client'
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { handelDeleteUser, handelGetListUser } from "../../service/user-service";
import { EditOutlined, UserDeleteOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import styles from './page.module.scss'
import { useRouter } from "next/navigation";
import urlPath from "../../constant/path";
import { toast } from "sonner";
import Skeletons from "@/component/Skeleton";

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
                let color = tags === 1 ? 'geekblue' : 'green';
                const renderName = tags === 1 ? 'Male' : 'Female'
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
                        <Button type="primary" onClick={() => router.push(`${urlPath.formUser}/${record.id}`)}>
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
                            <Button danger onClick={() => { setUserID(record.id) }}><UserDeleteOutlined /></Button>
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