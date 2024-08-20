import React, { useEffect, useState } from 'react'
import { Form, Input, Switch, Radio, Row, Col, DatePicker } from 'antd'
import { useUser } from '@/context/ProfileProvider';
import { UserOutlined } from '@ant-design/icons';
import UploadImageField from '@/component/UploadImageField/UploadImageField';
import { cleanObject } from '@/utils';
import styles from './FormProfile.module.scss'
import dayjs from 'dayjs';

export default function FormProfile({
    handleCancel,
    formId,
}) {
    const [isCheckGroup, setIsCheckGroup] = useState();
    const [value, setValue] = useState(1)
    const [form] = Form.useForm();
    const { user, updateProfile } = useUser();

    const onFinish = async (values) => {
        const bodyData = cleanObject({
            ...values,
            id: user.id,
            groupId: user.groupId,
            avatar: values.avatar === '' ? null : values.avatar,
        })
        await updateProfile({ bodyData });
        handleCancel();
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChangeGroup = (checked) => {
        setIsCheckGroup(checked)
    }

    const onChangeGender = (even) => {
        console.log(even.target.value)
    }

    useEffect(() => {
        form.setFieldValue('avatar', user.avatar)
    }, [user])
    console.log({user})

    return (
        <div className={styles.container}>
            <h2 style={{
                lineHeight: 4,
                fontWeight: 'bold',
                color: '#1677ff'
            }}>
                Profile Information <UserOutlined />
            </h2>
            <Form
                name="basic"
                layout="vertical"
                form={form}
                initialValues={{
                    email: user?.email,
                    name: user?.name,
                    address: user?.address,
                    groupId: user?.groupId === 1 ? true : false,
                    gender: user?.gender === 1 ? 1 : 2,
                    phone: user?.phone,
                    birthDay: user.birthDay ? dayjs(user?.birthDay) : null,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                id={formId}
            >
                <Form.Item
                    label="Avatar"
                    name="avatar"
                >
                    <UploadImageField />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            message: 'Please input your Name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name="phone"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Birth Day"
                    name="birthDay"
                >
                    <DatePicker
                        format={'DD-MM-YYYY'}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Group"
                            name="groupId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Group!',
                                },
                            ]}
                        >
                            <Switch
                                disabled
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
        </div>
    )
}
