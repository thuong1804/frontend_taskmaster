'use client'
import { Button, DatePicker, Form, Input, Select } from "antd";
import styles from './FormAddTodo.module.scss'
import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import { createTask, getByIdTask, updateTask } from "@/service/taskService";
import urlPath from "@/constant/path";
import { useEffect, useState } from "react";
import { handelGetListUser } from "@/service/user-service";
import { mappingDropdownData } from "@/constant/masterData";
import { toast } from "sonner";

const FormTask = () => {
    const router = useRouter();
    const params = useParams()
    const taskId = params.id;
    const isCreating = !taskId;
    const [detailTask, setDetailTask] = useState();
    const [userData, setUserData] = useState();
    const [form] = Form.useForm();
    const [scheduleDate, setScheduleDate] = useState();

    const onFinish = async (values) => {
        const dataBody = {
            ...values,
            userId: values.userId,
            reporter: values.reporter,
            scheduledDate: dayjs(values.scheduledDate).format('DD-MM-YYYY'),
            completedDate: dayjs(values.completedDate).format('DD-MM-YYYY'),
        }

        if (isCreating) {
            await createTask(dataBody)
            toast.success('Add task success')
        } else {
            await updateTask({
                ...dataBody,
                id: +params.id,
            })
            toast.success('Update task success')

        }
        router.push(urlPath.task)
    };

    const onChange = (date, dateString) => {
        setScheduleDate(date)
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

    useEffect(() => {
        const fetchDataUser = async () => {
            await handelGetListUser().then(res => {
                setUserData(res.data.data.content)
            })
        }
        fetchDataUser()
    }, [])

    useEffect(() => {
        if (!isCreating) {
            const {
                taskTitle,
                taskDescription,
                scheduledDate,
                completedDate,
                reporter,
                userId
            } = detailTask ?? {};
            form.setFieldValue('taskTitle', taskTitle);
            form.setFieldValue('taskDescription', taskDescription);
            form.setFieldValue('reporter', reporter);
            form.setFieldValue('userId', userId);
            form.setFieldValue('scheduledDate', dayjs(scheduledDate));
            form.setFieldValue('completedDate', dayjs(completedDate));
        }
    }, [form, detailTask, isCreating])

    const disabledDate = (current) => {
        const nowDate = dayjs().startOf('day');
        const currentDate = dayjs(current).startOf('day');
        const check = currentDate.isBefore(nowDate);
        return check;
    };

    return (
        <div className={styles.container}>
            <div className={styles.contentForm}>
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
                        <DatePicker
                            onChange={onChange}
                            style={{
                                width: '100%',
                            }}
                            disabledDate={disabledDate}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Completed Date"
                        name="completedDate"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Completed Date!',
                            },
                        ]}
                    >
                        <DatePicker
                            // onChange={onChange}
                            style={{
                                width: '100%',
                            }}
                            disabledDate={
                                (current) => {
                                    const selectedDate = dayjs(current).endOf('day');
                                    return selectedDate.isBefore(scheduleDate);
                                }
                            }
                        />
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
                            <Button htmlType="button" onClick={() => router.push(urlPath.task)}>
                                Cancel
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
            </div>
            
        </div>
    )
}
export default FormTask;