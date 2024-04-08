'use client'
import { Button, Form, Input, Select, Switch } from "antd";
import { useRouter } from 'next/navigation'
import styles from './register.module.scss'
import urlPath from "../../constant/path";
import { handelCreateUser } from "../../service/user-service";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Option } = Select;

const Register = () => {
    const router = useRouter();
    const [isCheckGroup, setIsCheckGroup] = useState();
    const onFinish = async (values) => {
        const dataBody = {
            ...values,
            groupId: isCheckGroup ? 1 : 2,
            gender: values.gender === 'male' ? 1 : 2,
        }
        await handelCreateUser(dataBody).then(res => {
            if (res.data.result) {
                router.push(urlPath.home)
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (checked) => {
        setIsCheckGroup(checked)
    }
    return (
        <>
            <Form
                name="basic"
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
                    remember: true,
                    gender: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your address!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Group"
                    name="groupId"
                >
                    <Switch
                        checkedChildren={'Admin'}
                        unCheckedChildren={'User'}
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <div className={styles.btnAction}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={() => router.push('/home')}>
                            Cancel
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </>)
}
export default Register;