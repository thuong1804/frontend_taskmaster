"use client"
import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/navigation'
import styles from './login.module.scss'
import urlPath from '../constant/path';
import { Toaster, toast } from "sonner";
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../service/authService';
import { useEffect } from 'react';

const LoginPage = () => {
    const router = useRouter();
    const onFinish = async (values) => {
        const email = values.email;;
        const password = values.password
        await login(email, password).then(res => {
            if (res.data.result) {
                toast.success("Login success!");
               return router.push(urlPath.home)
            }
        }).catch(error => {
            if(error) {
               return toast.error("Email or password don't exits!");
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={styles.container}>
            <h1>Please Login!</h1>
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
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
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
                        <Button htmlType="button" onClick={() => router.push(urlPath.register)}>
                            Register
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}
export default LoginPage;