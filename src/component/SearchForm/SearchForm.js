import { Button, Col, Form, Input, Row } from "antd"
import queryString from 'querystring'

import styles from './SearchForm.module.scss'
import { SearchOutlined, SyncOutlined } from "@ant-design/icons"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cleanObject } from "@/utils"

const SearchForm = ({
    searchField = []
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const [form] = Form.useForm();
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
    return (
        <div className={styles.container}>
            <Form
                onFinish={onFinish}
                autoComplete="off"
                className={styles.form}
                form={form}
            >
                <Row gutter={[16, 16]}>
                    <Col flex="auto">
                        <div className={styles.wrapperCol}>
                            {searchField.map((item, index) => {
                                return (
                                    <Form.Item
                                        name={item.key}
                                        key={index}
                                    >
                                        <Input
                                            placeholder={item.placeHoder} 
                                            style={{ width:'100%'}}
                                        />
                                    </Form.Item>
                                )
                            })}
                        </div>
                    </Col>
                    <Col flex="100px">
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