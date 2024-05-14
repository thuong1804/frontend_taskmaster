import { Button, Col, Form, Input, Row, Select } from "antd"
import queryString from 'querystring'

import styles from './SearchForm.module.scss'
import { SearchOutlined, SyncOutlined } from "@ant-design/icons"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { camelCaseToTitleCase, cleanObject, mappingDropdownData } from "@/utils"
import { TYPE } from "@/constant/constant"
import { useEffect, useState } from "react"
import { handelGetListUser } from "@/service/userService"

const SearchForm = ({
    searchField = [],
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const [form] = Form.useForm();
    const [listUser, setListUser] = useState([]) 

    const onFinish = (values, event) => {
        const data = cleanObject({
            ...values
        })
        const queryParam = queryString.stringify(data)
        router.replace(`${pathname}?${queryParam}`);
    }

    const onReset = () => {
        router.replace(pathname)
        form.resetFields()
    }

    useEffect(() => {
        const fetchData = async() => {
            await handelGetListUser().then(res => {
                if (res.data.data) {
                    setListUser(res.data.data.content)
                }
            })
        }
        fetchData()
    }, [])

    const getPlaceHolder = (item) => {
        return item.searchPlaceholder || `Search by ${camelCaseToTitleCase(item.key)}`;
    };

    const renderFieldType = (fieldItem) => {
        if (fieldItem.fieldType === undefined || fieldItem === null) {
            return null;
        }
        if (fieldItem.fieldType === TYPE.TEXT) {
            return (
                <Input
                    placeholder={getPlaceHolder(fieldItem)}
                    style={{ width:'100%'}}
                />
            )
        } else if (fieldItem.fieldType === TYPE.SELECT) {
            return (
                <Select
                    placeholder={getPlaceHolder(fieldItem)}
                    style={{ width:'100%'}}
                    options={mappingDropdownData(listUser)}
                />
            )
        }
    }
    return (
        <div className={styles.container}>
            <Form
                onFinish={onFinish}
                autoComplete="off"
                className={styles.form}
                form={form}
            >
                <Row gutter={[16, 16]}>
                    {searchField.map((item, index) => {
                        return (
                            <Col
                                span={4}
                                key={index}
                            >
                                <Form.Item
                                    name={item.key}
                                >
                                    {renderFieldType(item)}
                                </Form.Item>
                            </Col>

                                )
                            })}
                    <Col>
                        <Form.Item>
                            <div className={styles.btnAction}>
                                <Button type="primary" htmlType="submit">
                                    <SearchOutlined /> Search
                                </Button>
                                <Button htmlType="button" onClick={onReset}>
                                    <SyncOutlined /> Reset
                                </Button>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
export default SearchForm;