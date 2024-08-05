'use client'

import { Avatar, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import urlPath from "../../constant/path";
import dayjs from "dayjs";
import { DATETIME_FORMAT_VALUE, TYPE } from "@/constant/constant";
import { useListUsers } from "@/context/UsersProvider";
import { genderDDL, roleDDL } from "@/constant/masterData";
import ListContainer from "@/component/ListContainer";
import { useUser } from "@/context/ProfileProvider";

const ListPageUser = () => {
    const {users, deleteUsers} = useListUsers();
    const {user} = useUser()
    const mappingUser = users?.filter(item => item.id !== user.id)

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => {
                return (
                    <Avatar
                        src={`${process.env.NEXT_PUBLIC_WEB_URL}/${avatar}`}
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
            render: (gender) => {
                const color = gender === 1 ? 'geekblue' : 'green';
                const renderName = gender === 1 ? 'Male' : 'Female'
                return (
                    <Tag color={color} key={renderName}>
                        {gender ? renderName : null}
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
    ];

    return (
        <>
            <ListContainer 
                title='List User Manager'
                columns={columns}
                objectName="user"
                searchFields={[
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
                formUrl={urlPath.formUser}
                actionButtons={{
                    isEdit: true,
                    isDelete: true,
                }}
                deleteAction={deleteUsers}
                dataList={mappingUser}
            />
        </>
    )
}
export default ListPageUser