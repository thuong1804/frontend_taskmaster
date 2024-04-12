'use client'
import { Button, Form, Input, Select, Switch } from "antd";
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './register.module.scss'
import urlPath from "../../constant/path";
import { handelCreateUser } from "../../service/user-service";
import { UserOutlined, LockOutlined, SmileOutlined } from "@ant-design/icons";
import { useState } from "react";
import { register } from "@/service/authService";
import { toast } from "sonner";

const Register = () => {
    const router = useRouter();
    const [isCheckGroup, setIsCheckGroup] = useState();

    const onFinish = async (values) => {
        const dataBody = {
            ...values,
        }
        await register(dataBody).then(res => {
            if (res.data.result) {
                router.push(urlPath.login)
                toast.success('Register new account success')
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
                name="normal_login"
                style={{
                    padding:'30px',
                    height: '450px'
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
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input placeholder="Email" prefix={<UserOutlined className="site-form-item-icon" />}/>
                </Form.Item>

                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input placeholder="Name" prefix={<SmileOutlined className="site-form-item-icon" />}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input.Password placeholder="Password" prefix={<LockOutlined className="site-form-item-icon" />}/>
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your ConfirmPassword!',
                        },
                    ]}
                >
                    <Input.Password placeholder="Confirm Password" prefix={<LockOutlined className="site-form-item-icon" />}/>
                </Form.Item>
                <Form.Item>
                    <div className={styles.btnAction}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                        <div className={styles.titleFooter}>
                            <span>Already have an account?</span>
                            <Link href={urlPath.login} style={{color:'#1677ff', cursor:'pointer'}}> Login</Link>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </>)
}
export default Register;