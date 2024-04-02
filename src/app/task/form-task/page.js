'use client'
import { Button, DatePicker, Form, Input, Select } from "antd";
import styles from './formAddTodo.module.scss'
import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useUser } from "@/context/ProfileProvider";
import { createTask, getByIdTask, updateTask } from "@/service/taskService";
import urlPath from "@/constant/path";
import { useEffect, useState } from "react";
import { handelGetListUser } from "@/service/user-service";
import { getLabel, mappingDropdownData } from "@/constant/masterData";
import { toast } from "sonner";

const FormTodo = () => {
    const router = useRouter();
    const { user } = useUser();
    const params = useParams()
    const taskId = params.id;
    const isCreating = !taskId;
    const [detailTask, setDetailTask] = useState();
    const [userData, setUserData] = useState();
    const userName = userData?.map(item => item.id)
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const checkUserReport = userName.includes(values.reporter)
        const dataBody = {
            ...values,
            userId: values.userId,
            reporter: values.reporter,
            scheduledDate: dayjs(values.scheduledDate).format('DD-MM-YYYY'),
            completedDate: dayjs(values.completedDate).format('DD-MM-YYYY'),
        }

        if (isCreating) {
            await createTask(dataBody)
        } else {
            await updateTask({
                ...dataBody,
                id: +params.id,
            })
        }
        toast.success('Add task success')
        router.push(urlPath.task)
    };

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (!isCreating) {
            const fetchData = async () => {
                await getByIdTask(taskId).then(res => {
                    setDetailTask(res.data.data.content)
                })
            }
            fetchData()
        }
    }, [taskId])
    console.log({user})

    useEffect(() => {
        const fetchDataUser = async () => {
            await handelGetListUser().then(res => {
                console.log({res})
                setUserData(res.data.data.content)
            })
        }
        fetchDataUser()
    }, [])

    useEffect(() => {
        if (!isCreating) {
            const { taskTitle, taskDescription, scheduledDate, completedDate, reporter, userId } = detailTask ?? {};
            form.setFieldValue('taskTitle', taskTitle);
            form.setFieldValue('taskDescription', taskDescription);
            form.setFieldValue('reporter', reporter);
            form.setFieldValue('userId', userId);
            form.setFieldValue('scheduledDate', dayjs(scheduledDate));
        }
    }, [form, detailTask, isCreating])

    return (
        <div className={styles.container}>
            <h1> {isCreating ? 'Add task' : 'Edit task'} </h1>
            <div style={{ width: '700px' }}>
                <Form
                // initialValues={{
                //     reporter: user.name
                // }}
                    name="basic"
                    form={form}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
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
                        label="Reporter"
                        name="reporter"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Task title!',
                            },
                        ]}
                    >
                       <Select
                            placeholder="Select a option Owner"
                            // onChange={onGenderChange}
                            options={mappingDropdownData(userData)}
                            allowClear
                        />
                    </Form.Item>

                    <Form.Item
                        label="Owner"
                        name="userId"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Owner!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a option Owner"
                            // onChange={onGenderChange}
                            options={mappingDropdownData(userData)}
                            allowClear
                        />
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
                        label="Scheduled Date"
                        name="scheduledDate"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Scheduled Date!',
                            },
                        ]}
                    >
                        <DatePicker onChange={onChange} style={{
                            width: '100%',
                        }} />
                    </Form.Item>
                    {/* <Form.Item
                        label="Completed Date"
                        name="completedDate"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Completed Date!',
                            },
                        ]}
                    >
                        <DatePicker onChange={onChange}
                            style={{
                                width: '100%',
                            }} />
                    </Form.Item> */}

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
                            <Button htmlType="button" onClick={() => router.push(urlPath.task)}>
                                Cancel
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default FormTodo;