import React, { useState } from 'react'
import { Button, Form, Input, Switch, Radio, Row, Col } from 'antd'
import { useUser } from '@/context/ProfileProvider';
import styles from './form-profile.module.scss'
import { toast } from "sonner";
import { handelGetListUser, handelUpdateUser } from '@/service/user-service';

export default function FormProfile({ setIsModalOpen }) {
    const [isCheckGroup, setIsCheckGroup] = useState();
    const [value, setValue] = useState(1);
    const { user } = useUser();

    const onFinish = async(values) => {
        const bodyData ={
            ...values,
            id: user.id,
            groupId: values.groupId === true ? 1 : 2,
        }
        await handelUpdateUser(bodyData).then((res) => {
            if (res.data.result) toast.success('Update profile success')
        })
        setIsModalOpen(pre => !pre)
        console.log('Success:', values);
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

    return (
        <Form
            name="basic"
            layout="vertical"
            initialValues={{
                email: user?.email,
                name: user?.name,
                address: user?.address,
                groupId: user?.groupId === 1 ? true : false,
                gender: user?.gender === 1 ? 1 : 2,
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
                <Input  disabled/>
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
                rules={[
                    {
                        message: 'Please input your Address!',
                    },
                ]}
            >
                <Input />
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
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <div className={styles.btnAction}>
                    <Button htmlType="button" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
}
