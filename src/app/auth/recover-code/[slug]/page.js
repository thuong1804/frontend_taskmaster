'use client'

import React from 'react'
import { Button, Form, Input } from 'antd';
import Link from 'next/link'
import { ProductOutlined } from '@ant-design/icons';
import { toast } from "sonner";

import urlPath from '@/constant/path';
import styles from './page.module.scss';
import { useParams, useSearchParams } from 'next/navigation';
import { verifyCode } from '@/service/authService';

export default function RecoverCode() {

    const params = useParams()
    const emailSlug = params.slug.replace(/%40/g, '@')
    console.log({params: params.slug.replace(/%40/g, '@')})

    const onFinish = async(values) => {
        const dataBody = {
            code: values.code,
            emailUSer: emailSlug,
        }
        await verifyCode(dataBody)
    }

    return (
        <div className={styles.container}>
            <div className={styles.formContent}>
                <h1>Enter the security code</h1>
                <p>Please check the code in your email. This code includes 6 numbers</p>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                    style={{
                        width: '100%',
                        padding: '30px',
                    }}
                >
                    <Form.Item
                        name="code"
                        rules={[{
                            required: true,
                            message: 'Please input your code!',
                        }]}
                    >
                        <Input prefix={<ProductOutlined />} placeholder="Code!" />
                    </Form.Item>
                    <Form.Item>
                        <div className={styles.footer}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Input Code
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
