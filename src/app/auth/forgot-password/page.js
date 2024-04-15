'use client'

import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import Link from 'next/link'
import { MailOutlined, RollbackOutlined } from '@ant-design/icons';
import { toast } from "sonner";

import urlPath from '@/constant/path';
import styles from './page.module.scss';
import { sendEmailCode } from '@/service/authService';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
    const [form] = Form.useForm();
    const router = useRouter()

    const onFinish = async(values) => {
        const emailInput = {
            email: values.email
        }

        await sendEmailCode(emailInput).then(res => {
            if (res.data.result) {
                toast.success('The code has been sent to your Gmail, please check the code in Gmail.')
                router.push(`${urlPath.recoverCode}/${values.email}`)
            }
        }).catch(error => {
            if (error.response.status === 404)
                return form.setFields([
                        {
                            name: "email", // required
                            errors: ["The email does not exist in the system."],
                        },
                ]);

        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContent}>
                <h1>Forgot Password</h1>
                <p>Please enter your email for verification to receive the code</p>
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
                        name="email"
                        rules={[{
                            required: true,
                            message: 'Please input your Email!',
                            type: "email"
                        }]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email!" />
                    </Form.Item>
                    <Form.Item>
                        <div className={styles.footer}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Send Code
                            </Button>
                            <Link href={urlPath.login} className={styles.backLogin}>
                                <RollbackOutlined /> Back to Login
                            </Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
