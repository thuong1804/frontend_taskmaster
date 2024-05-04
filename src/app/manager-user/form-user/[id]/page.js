'use client'
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { Option } from "antd/es/mentions";
import styles from './page.module.scss'
import { handelGetByIdUser, handelUpdateUser } from "@/service/user-service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import urlPath from "@/constant/path";
import { CheckOutlined, CloseOutlined, UserAddOutlined } from "@ant-design/icons";

const FormUser = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [detailUser, setDetailUser] = useState();
    const paramsId = useParams();

    const onFinish = async (values) => {
        const bodyData = {
            ...values,
            groupId: values.groupId === 'Admin' ? 1 : 2,
            id: +paramsId.id,
            gender: values.gender === 'male' ? 1 : 2,
        };
        await handelUpdateUser(bodyData).then((res) => {
            if (res.data.result) router.push('/home')
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
    console.log({detailUser})
    return (
        <div className={styles.container}>
            <div className={styles.formContent}>
                <h1><UserAddOutlined /> Edit user</h1>
                <Form
                    name="basic"
                    form={form}
                    labelCol={{
                        span: 16,
                    }}
                    wrapperCol={{
                        span: 22,
                    }}
                    layout="vertical"
                    style={{
                        width: '100%',
                    }}
                    initialValues={{
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Email"
                                name='email'
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
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
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
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
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Address"
                                name="address"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Select a option gender"
                                    allowClear

                                >
                                    <Option value="male">male</Option>
                                    <Option value="female">female</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Phone number"
                                name="phone"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Birthday"
                                name="birthDay"
                            >
                                <DatePicker style={{width:'100%'}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>

            <div className={styles.btnAction}>
                <Button htmlType="button" onClick={() => router.push(urlPath.manageUser)}>
                    <CloseOutlined /> Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                    <CheckOutlined /> Submit
                </Button>
            </div>
        </div>

    )
}
export default FormUser;