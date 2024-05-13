'use client'
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { Option } from "antd/es/mentions";
import styles from './page.module.scss'
import { handelCreateUser, handelGetByIdUser, handelUpdateUser } from "@/service/user-service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import urlPath from "@/constant/path";
import { CheckOutlined, CloseOutlined, LockOutlined, UserAddOutlined } from "@ant-design/icons";
import { cleanObject, validateEmail, validationPassword } from "@/utils";
import { DATETIME_FORMAT_DISPLAY, DATETIME_FORMAT_VALUE, passwordRegex, phoneRegExp, whiteSpaceRegex } from "@/constant/constant";
import { toast } from "sonner";
import dayjs from "dayjs";

const FormUser = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [detailUser, setDetailUser] = useState();
    const paramsId = useParams();
    const isCreating = !paramsId.id

    const onFinish = async (values) => {
        const bodyData = cleanObject({
            ...values,
            id: +paramsId.id,
        });

        if (isCreating) {
            await handelCreateUser(bodyData).then(res => {
                if (res.data.result) {
                    toast.success('Create user success')
                    router.push(urlPath.user)
                }
            })
        } else {
            await handelUpdateUser(bodyData).then((res) => {
                console.log({res})
                if (res.data.result) {
                    toast.success('Update user success')
                    router.push(urlPath.user)
                } 
            })
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const fetchDataById = async () => {
            await handelGetByIdUser(paramsId.id)
                .then(res => setDetailUser(res.data.data.content))
        }
        fetchDataById();
    }, [paramsId])

    useEffect(() => {
        const { email, name, groupId, address, gender, phone, birthDay } = detailUser ?? {};

        if (!isCreating) {
            form.setFieldValue('email', email);
            form.setFieldValue('name', name);
            form.setFieldValue('groupId', groupId === 1 ? 'Admin' : 'User');
            form.setFieldValue('address', address);
            form.setFieldValue('gender', gender === 1 ? 'male' : 'female');
            form.setFieldValue('phone', phone);
            form.setFieldValue('birthDay', birthDay ? dayjs(birthDay): undefined);
        }
    }, [form, detailUser, isCreating])

    return (
        <div className={styles.container}>
            <div className={styles.formContent}>
                <h1><UserAddOutlined /> Edit user</h1>
                <Form
                    id="form-user"
                    name="basic"
                    form={form}
                    labelCol={{
                        span: 16,
                    }}
                    wrapperCol={{
                        span: 22,
                    }}
                    layout="vertical"
                    style={{
                        width: '100%',
                    }}
                    initialValues={{
                        gender: undefined
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Email"
                                name='email'
                                required
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
                                <Input disabled={!isCreating} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
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
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Group"
                                name="groupId"
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
                                    defaultValue={detailUser?.groupId}
                                >
                                    <Option value={1}>Admin</Option>
                                    <Option value={2}>User</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Address"
                                name="address"
                            >
                                <Input />
                            </Form.Item>
                          
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Phone number"
                                name="phone"
                                rules={[
                                    {
                                        pattern: phoneRegExp,
                                        message: "Invalid phone number!"
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Birthday"
                                name="birthDay"
                            >
                                <DatePicker 
                                    format={'DD-MM-YYYY'}
                                    style={{ width: '100%' }}  
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label='Password'
                                name="password"
                                rules={[
                                    {required: true, message: 'Please enter a password'},
                                    {
                                        pattern: whiteSpaceRegex,
                                        message: "Passwords cannot begin and end with spaces!"
                                    },
                                    {
                                        pattern: passwordRegex,
                                        message: "Passwords must only use letters, numbers and common special characters!"
                                    },
                                    {
                                        min: 8,
                                        message: "Password must have a minimum of 8 characters!"
                                    },
                                ].filter(item => isCreating ? true : !item.required)}
                            >
                                <Input.Password placeholder="Password" prefix={<LockOutlined className="site-form-item-icon" />} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label='Confirm Password'
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
                                ].filter(item => isCreating ? true : !item.required)}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password!" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="gender" 
                                label="Gender"
                            >
                                <Select
                                    placeholder="Select a option gender"
                                    allowClear
                                >
                                    <Option value={1}>male</Option>
                                    <Option value={2}>female</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                       
                    </Row>
                </Form>
            </div>
            <div className={styles.btnAction}>
                <Button htmlType="button" onClick={() => router.push(urlPath.user)}>
                    <CloseOutlined /> Cancel
                </Button>
                <Button type="primary" htmlType="submit" form="form-user">
                    <CheckOutlined /> Submit
                </Button>
            </div>
        </div>

    )
}
export default FormUser;