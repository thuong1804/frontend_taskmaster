'use client'

import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import Link from 'next/link'
import { LockOutlined, RollbackOutlined } from '@ant-design/icons';
import { toast } from "sonner";

import urlPath from '@/constant/path';
import styles from './page.module.scss';
import { changePassword, changePasswordForgot, sendEmailCode } from '@/service/authService';
import { useParams, useRouter } from 'next/navigation';

const ChangePassword = () => {
    const [form] = Form.useForm();
    const params = useParams();
    const emailSlug = params.slug.replace(/%40/g, '@')
    const router = useRouter();
    const onFinish = async(values) => {
        const dataBody = {
            ...values,
            email: emailSlug,
        }
        await changePasswordForgot(dataBody).then(res => {
            if (res.data.result) {
                toast.success('Change password success')
                router.push(urlPath.login)
            }
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContent}>
                <h1>Change Password</h1>
                <p>Enter new password!</p>
                <Form
                    name="normal_login"
                    className="login-form"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    style={{
                        width: '100%',
                        padding: '30px',
                    }}
                >
                    <Form.Item
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Please input your Password!',
                        }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password!" />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password!" />
                    </Form.Item>
                    <Form.Item>
                        <div className={styles.footer}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Change Password
                            </Button>
                            <Link href={urlPath.login} className={styles.backLogin}>
                                <RollbackOutlined /> Back to Send Email Code
                            </Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default ChangePassword;