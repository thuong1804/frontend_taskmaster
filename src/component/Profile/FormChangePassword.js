import { Button, Col, Form, Input, Row } from 'antd'
import React from 'react'
import { KeyOutlined, LockOutlined } from '@ant-design/icons';
import { useUser } from '@/context/ProfileProvider';
import { changePassword } from '@/service/authService';
import { toast } from 'sonner';
import { useForm } from 'antd/es/form/Form';

export default function FormChangePassword({
    handleCancel,
    formId,
}){
    const { user } = useUser()
    const [form] = useForm();

    const onFinish = async (values) => {
        const dataBody = {
            email: user?.email,
            password: values.password,
            newPassword: values.newPassword,
        }
        await changePassword(dataBody).then(res => {
            if (res.data.result) {
                toast.success('Change password success')
                handleCancel();
            }
        }).catch(error => {
            if (error.response.status === 400)
                return form.setFields([{
                        name: "newPassword", // required
                        errors: ["Password is too short. Please enter a password with at least 8 characters."],
                    }]);

            if (error.response.status === 404)
                return form.setFields([{
                        name: "password", // required
                        errors: ["Current password is incorrect"],
                    }]);
        })
    }

    return (
        <div>
            <h2 style={{
                lineHeight: 4,
                fontWeight: 'bold',
                color: '#1677ff'
            }}>Change Password <KeyOutlined /></h2>
            <Form
                name="basic"
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                id={formId}
            >
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your old password!',
                        },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder='Current password' />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (getFieldValue('password') === value) {
                                    return Promise.reject(new Error('The new password must not be the same as the old password'));
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder='New password' />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    dependencies={['newPassword']}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder='Confirm new password' />
                </Form.Item>
            </Form>
        </div>
    )
}
