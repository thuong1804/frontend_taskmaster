'use client'
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import styles from './formAddTodo.module.scss'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import urlPath from "@/app/constant/path";
import { useUser } from "@/app/component/context/ProfileProvider";
import dayjs from "dayjs";
const FormAddTodo = () => {
    const router = useRouter();
    const { user } = useUser();
    console.log({ user })
    // const id = user
    const onFinish = async (values) => {
        // const dataBody = { ...values, userId: 25 }
        // await axios({
        //     method: 'post',
        //     url: `${process.env.NEXT_PUBLIC_WEB_URL}/task/create-task`,
        //     data: {
        //         ...dataBody
        //     }
        // }).then((res) => router.push(urlPath.home));
        // console.log({values: dayjs(values.completedDate).format('YYYY-MM-DD')})

    };
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div style={{ width: '700px' }}>
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
                    label="Task title"
                    name="taskTitle"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Task title!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Task Description"
                    name="taskDescription"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Task Description!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Schedule Date"
                    name="scheduleDate"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Task Description!',
                        },
                    ]}
                >
                    <DatePicker onChange={onChange} style={{
                        width: '100%',
                    }} />
                </Form.Item>
                <Form.Item
                    label="Completed Date"
                    name="completedDate"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Task Description!',
                        },
                    ]}
                >
                    <DatePicker onChange={onChange} style={{
                        width: '100%',
                    }} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <div className={styles.btnAction}>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button htmlType="button" onClick={() => router.push('/todo-list')}>
                            Cancel
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}
export default FormAddTodo;