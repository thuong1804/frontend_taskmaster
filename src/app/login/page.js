"use client"
import { Button, Checkbox, Form, Input } from 'antd';
import axios from "axios";
import { useRouter } from 'next/navigation'
import styles from './login.module.scss'
import urlPath from '../constant/path';

const LoginPage = () => {
  const router = useRouter();
  const onFinish = async (values) => {
    const { email, password } = values
    await axios({
      method: 'post',
      url: process.env.NEXT_PUBLIC_WEB_URL + urlPath.login,
      data: {
        email,
        password,
      }
    }).then((res) => {
      console.log({res})
      if (res.data.result) {
        let dataSession = {
          isAuthenticated: true,
          token: res.data.data.content.tokens.accessToken
        }
        sessionStorage.setItem('user', JSON.stringify(dataSession));
        return router.push(urlPath.todoList)
      }
    });
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
            <Button htmlType="button" onClick={() => router.push('/signup')}>
              Register
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}
export default LoginPage;