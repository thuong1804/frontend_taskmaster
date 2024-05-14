"use client"
import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/navigation'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from './login.module.scss'
import { toast } from "sonner";
import Link from 'next/link'
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../../service/authService';
import urlPath from '@/constant/path';
import { useUser } from '@/context/ProfileProvider';
import { getCookies } from 'cookies-next';
import { handelGetProfileUser } from '@/service/userService';
import LineRender from '@/component/Line/line';

const LoginPage = () => {
    const router = useRouter();
    const {setUser} = useUser();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const email = values.email;;
        const password = values.password

        await login(email, password).then(async (res) => {
            if (res.data.result) {
                toast.success("Login success!");
                router.push(urlPath.home)
                setTimeout(async () => {
                    try {
                        const cookies = getCookies('login');
                        if (cookies && cookies.login) {
                            const res = await handelGetProfileUser();
                            setUser(res.data.data.content);
                        }
                    } catch (error) {
                        console.error("Error fetching user profile:", error);
                    }
                }, 2000);
            }
        }).catch(error => {
            if (error.response.status === 404) {
                return toast.error("Email don't exits in system!");
            } else if (error.response.status === 400) {
                return form.setFields([
                    {
                        name: "password",
                        errors: ["Incorret password"],
                    },]);
            } else if (error.response.status === 500) {
                return toast.error("Internal Server Error!")
            }
        })
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContent}>
                <LineRender 
                    text='login' 
                    size='medium'
                />
                <Form
                    name="normal_login"
                    className="login-form"
                    form={form}
                    initialValues={{
                        email: 'thuongtvt30@gmail.com',
                        password: '12345678'
                    }}
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
                        <Input.Password
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

                            <Link className="login-form-forgot" href={urlPath.forgotPassWord}>
                                Forgot password
                            </Link>
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