import { Button, Col, Form, Input, Row, Select } from "antd"
import queryString from 'querystring'

import styles from './SearchForm.module.scss'
import { SearchOutlined, SyncOutlined } from "@ant-design/icons"
import { usePathname, useRouter } from "next/navigation"
import { camelCaseToTitleCase, cleanObject } from "@/utils"
import { TYPE } from "@/constant/constant"

const SearchForm = ({
    searchField = [],
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

    const getPlaceHolder = (item) => {
        return item.searchPlaceholder || `Search by ${camelCaseToTitleCase(item.key)}`;
    };

    const renderFieldType = (fieldItem) => {
        let {options} = fieldItem
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
            const filterOption = (input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
                return (
                    <Select
                        placeholder={getPlaceHolder(fieldItem)}
                        style={{ width:'100%'}}
                        options={options}
                        filterOption={filterOption}
                        showSearch
                        disabled={fieldItem.disabled}
                        allowClear
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
                    <Col flex="auto">
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