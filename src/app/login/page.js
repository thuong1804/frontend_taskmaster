"use client"
import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/navigation'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from './login.module.scss'
import urlPath from '../../constant/path';
import { toast } from "sonner";
import Link from 'next/link'
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../service/authService';

const LoginPage = () => {
    const router = useRouter();

    const onFinish = async (values) => {
        const email = values.email;;
        const password = values.password
        await login(email, password).then(async (res) => {
            if (res.data.result) {
                toast.success("Login success!");
                router.push(urlPath.home)
            }
        }).catch(error => {
            if (error) {
                return toast.error("Email or password don't exits!");
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContent}>
                <h1>Login</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    style={{
                        width:'100%',
                        padding:'30px',
                    }}
                >
                    <Form.Item
                        name="email"
                        rules={[{
                            required: true,
                            message: 'Please input your Email!',
                             type:"email"
                        }]}
                    >
                        <Input prefix={<UserOutlined  />} placeholder="Email!" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <div className={styles.content}>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <div className={styles.footer}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                          <span>Or <Link href={urlPath.register}>register now!</Link></span>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default LoginPage;