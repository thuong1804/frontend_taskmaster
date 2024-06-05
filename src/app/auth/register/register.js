'use client'
import { Button, Form, Input, Select, Switch } from "antd";
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './register.module.scss'
import { UserOutlined, LockOutlined, SmileOutlined } from "@ant-design/icons";
import { useState } from "react";
import { register } from "@/service/authService";
import { toast } from "sonner";
import urlPath from "@/constant/path";
import { validateEmail, validationPassword } from "@/utils";

const Register = () => {
    const router = useRouter();
    const [form] = Form.useForm();
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
        }).catch(e => {
                if (e.response.status === 400) {
                    return form.setFields([
                        {
                            name: "email",
                            errors: ["The email has exist in the system."],
                        },]);
        }})

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
                form={form}
                style={{
                    padding: '30px',
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
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (value) {
                                    if (!validateEmail(value)) {
                                        return Promise.reject(
                                            new Error('Invalid email format. Please enter a valid email address.'))
                                    }
                                } else {
                                    return Promise.reject(
                                        new Error('Please input your email!'))
                                }
                                return Promise.resolve()
                            },
                        }),
                    ]}
                >
                    <Input placeholder="Email" prefix={<UserOutlined className="site-form-item-icon" />} />
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
                    <Input placeholder="Name" prefix={<SmileOutlined className="site-form-item-icon" />} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={validationPassword('password')}
                >
                    <Input.Password placeholder="Password" prefix={<LockOutlined className="site-form-item-icon" />} />
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
                    <Input.Password placeholder="Confirm Password" prefix={<LockOutlined className="site-form-item-icon" />} />
                </Form.Item>
                <Form.Item>
                    <div className={styles.btnAction}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                        <div className={styles.titleFooter}>
                            <span>Already have an account?</span>
                            <Link href={urlPath.login} style={{ color: '#1677ff', cursor: 'pointer' }}> Login</Link>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
}
export default Register;