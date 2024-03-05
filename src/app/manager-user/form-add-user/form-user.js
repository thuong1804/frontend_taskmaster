import { Button, Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import styles from '../form-add-user/page.module.scss'
import { handelCreateUser } from "@/app/service/user-service";

const FormUser = () => {

    const onFinish = async(values) => {
        const bodyData = {...values};
        await handelCreateUser(bodyData)
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
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
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Group"
                name="group"
                rules={[
                    {
                    required: true,
                    message: 'Please input your group!',
                    },
                ]}
            >
               <Select
                    placeholder="Select a option Group"
                    // onChange={onGenderChange}
                    allowClear
                >
                    <Option value="Admin">Admin</Option>
                    <Option value="User">User</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Address"
                name="address"
            >
                <Input />
            </Form.Item>
            <Form.Item name="Gender" label="Gender" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option gender"
                    // onChange={onGenderChange}
                    allowClear
                >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">Bê Đê</Option>
                </Select>
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
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <div className={styles.btnAction}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="submit">
                        Cancel
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
}
export default FormUser;