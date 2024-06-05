'use client'
import { Avatar, Button, Popconfirm, Space, Table, Tag } from "antd";
import { useState } from "react";
import { EditOutlined, UserDeleteOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import styles from './page.module.scss'
import { useRouter } from "next/navigation";
import urlPath from "../../constant/path";
import Skeletons from "@/component/Skeleton";
import dayjs from "dayjs";
import { DATETIME_FORMAT_VALUE, TYPE } from "@/constant/constant";
import { useListUsers } from "@/context/UsersProvider";
import SearchForm from "@/component/SearchForm/SearchForm";
import { genderDDL, roleDDL } from "@/constant/masterData";

const ListPageUser = () => {
    const router = useRouter();
    const [userID, setUserID] = useState([]);
    const {users, deleteUsers} = useListUsers();


    const confirm = async (e) => {
       await deleteUsers(userID)
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
            {!users ? (
                <Skeletons className={styles.skeleton} />
            ) : (
                <div className={styles.container}>
                    <h1> <UserOutlined /> List User Manager</h1>
                        <SearchForm
                            searchField={[
                                {
                                    key: 'email',
                                    searchPlaceholder: 'Email',
                                    fieldType: TYPE.TEXT,
                                },
                                {
                                    key: 'gender',
                                    searchPlaceholder: 'Gender',
                                    fieldType: TYPE.SELECT,
                                    options: genderDDL,
                                },
                                {
                                    key: 'groupId',
                                    searchPlaceholder: 'Group',
                                    fieldType: TYPE.SELECT,
                                    options: roleDDL,
                                },
                            ]}
                        />
                    <div className={styles.FormAddNew}>
                        <Button 
                            type="primary" 
                            icon={<PlusOutlined />}
                            onClick={() => router.push(urlPath.formUser)}
                        >
                            Create a new user
                        </Button>
                    </div>
                    <Table rowKey={'id'} columns={columns} dataSource={users} />
                </div>
            )}
        </>
    )
}
export default ListPageUser