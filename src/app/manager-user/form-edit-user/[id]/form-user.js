'use client'
import { Button, Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import styles from '../page.module.scss'
import { handelCreateUser, handelGetByIdUser, handelUpdateUser } from "@/app/service/user-service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FormUser = ({ paramsId }) => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [detailUser, setDetailUser] = useState();

    const onFinish = async (values) => {
        const datatest = {
            "id": 1,
            "email": "thiong@gmail.com",
            "name": "lll ne ",
            "address": "zzzz",
            "gender": "1",
            "groupId": 1
        }

        const bodyData = {
            ...values,
            groupId: values.groupId === 'Admin' ? 1 : 2,
            id: +paramsId.id,
            gender: '1'
        };
        await handelUpdateUser(bodyData).then((res) => {
            if (res.data.result) router.push('/')
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const fetchDataById = async () => {
            await handelGetByIdUser(paramsId.id)
                .then(res => setDetailUser(res.data.data.content))
        }
        fetchDataById();
    }, [paramsId])

    useEffect(() => {
        const { email, name, groupId, address, gender } = detailUser ?? {};
        form.setFieldValue('email', email);
        form.setFieldValue('name', name);
        form.setFieldValue('groupId', groupId === 1 ? 'Admin' : 'User');
        form.setFieldValue('address', address);
        form.setFieldValue('gender', gender === '1' ? 'male' : 'female');
    }, [form, detailUser])

    return (
        <Form
            name="basic"
            form={form}
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name='email'
            >
                <Input disabled />
            </Form.Item>

            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Group"
                name="groupId"
                rules={[
                    {
                        required: true,
                        message: 'Please input your group!',
                    },
                ]}
            >
                <Select
                    placeholder="Select a option Group"
                    // onChange={onGenderChange}
                    allowClear
                    defaultValue={detailUser?.groupId}
                >
                    <Option value="Admin">Admin</Option>
                    <Option value="User">User</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Address"
                name="address"
            >
                <Input />
            </Form.Item>
            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option gender"
                    // onChange={onGenderChange}
                    allowClear

                >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                </Select>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <div className={styles.btnAction}>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                    <Button htmlType="button" onClick={() => router.push('/')}>
                        Cancel
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
}
export default FormUser;