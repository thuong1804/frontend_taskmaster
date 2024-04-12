import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Drawer, Form, Input, Radio, Row, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './FormAddNew.module.scss'
import { handelCreateUser } from '@/service/user-service';
import { toast } from 'sonner';

export default function FormAddNew({setReloadData}) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [value, setValue] = useState(1);
    const [isCheckGroup, setIsCheckGroup] = useState();

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onFinish = async (values) => {
        const bodyData = {
            ...values,
            groupId: values.groupId === isCheckGroup ? 1 : 2,
        };
        await handelCreateUser(bodyData).then((res) => {
            if (res.data.result)
                toast.success('Create user success')
                setReloadData(pre => !pre)
        })
        onClose();
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChangeGender = (even) => {
        console.log(even.target.value)
    }

    const onChangeGroup = (checked) => {
        setIsCheckGroup(checked)
    }

    useEffect(() => {
        form.setFieldValue('email', '');
        form.setFieldValue('name', '');
        form.setFieldValue('groupId', undefined);
        form.setFieldValue('address', '');
        form.setFieldValue('gender', undefined);
        form.setFieldValue('password', '');
    }, [open, form])

    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                Create a new user
            </Button>
            <Drawer
                title="Create a new user"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <Form
                    name="basic"
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item>
                        <div className={styles.btnAction}>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="primary" htmlType='submit'>
                                Submit
                            </Button>
                        </div>
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                      },
                                    {
                                        required: true,
                                        message: 'Please enter email',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter email" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter user name',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter user name" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="address"
                                label="Address"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: 'Please enter address',
                                //     },
                                // ]}
                            >
                                <Input placeholder="Please enter address" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
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
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Group"
                                name="groupId"
                            >
                                <Switch
                                    checkedChildren={'Admin'}
                                    unCheckedChildren={'User'}
                                    onChange={onChangeGroup}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="gender"
                                label="Gender"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter user name',
                                    },
                                ]}
                            >
                                <Radio.Group onChange={onChangeGender} value={value}>
                                    <Radio value={1}>Male</Radio>
                                    <Radio value={2}>Female</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}
