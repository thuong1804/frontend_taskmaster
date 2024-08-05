import { Button, Popconfirm, Table } from "antd";
import { PlusOutlined, EditOutlined, LineOutlined } from '@ant-design/icons';
import SearchForm from "../SearchForm/SearchForm";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@/context/ProfileProvider";

import styles from './index.module.scss'
import urlPath from "@/constant/path";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const ListContainer = ({
    title,
    searchFields = [],
    columns,
    getListAction,
    objectName = '',
    formUrl,
    pageSize = 6,
    actionButtons = {
        isEdit: false,
        isDelete: false,
    },
    deleteAction,
    dataList,
    filterParams = {},
    onGetListSuccess,
}) => {
    const [data, setData] = useState([])
    const { user } = useUser()
    const router = useRouter();
    const [reloadPage, setReloadPage] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const handelFilterParams = useMemo(() => {
        return { ...filterParams }
    }, [filterParams])

    const confirm = async (e, id) => {
        await deleteAction(id).then(res => {
            if (res.data.result) {
                toast.success(`Delete ${objectName} success`)
                setReloadPage(prevFlag => !prevFlag)
            }
        }).catch((error) => {
            console.log({ error })
            if (error) {
                return toast.error('Delete failed')
            }
        })
    };

    const prepareColumns = (columns) => {
        if (actionButtons) {
            columns.push({
                title: 'Action',
                width: '10%',
                render: (_, record) => (
                    <div className={styles.btnAction}>
                        {actionButtons.isEdit && (
                            <Button
                                type="primary"
                                onClick={() => router.push(`${formUrl}/${record.id}`)}
                            >
                                <EditOutlined />
                            </Button>
                        )}
                        {actionButtons.isDelete && (
                            <Popconfirm
                                placement="topRight"
                                title={`Delete ${objectName}`}
                                description={`Are you sure to delete this ${objectName}?`}
                                onConfirm={() => confirm(_, record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button danger>
                                    <LineOutlined />
                                </Button>
                            </Popconfirm>
                        )}
                    </div>
                ),
            },)
        }
        return columns
    }

    const fetchData = useCallback(async () => {
        try {
            if (getListAction) {
                const response = await getListAction({ ...handelFilterParams });
                setData(response.data.data.content || response.data.data);
                onGetListSuccess?.(response.data.data.content || response.data.data)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [getListAction, handelFilterParams, reloadPage])

    useEffect(() => {
        if (!dataList) {
            fetchData();
        }
    }, [fetchData])

    useEffect(() => {
        if (dataList) {
            setData(dataList)
            onGetListSuccess?.(dataList)
        }
    }, [dataList])


    return (
        <div className={styles.container}>
            <span className={styles.title}>{title}</span>
            <div className={styles.actionFilter}>
                <SearchForm
                    searchField={searchFields}
                />
            </div>
            <div className={styles.contentTable}>
                <div className={styles.btnAddAction}>
                    <Button
                        type='primary'
                        onClick={() => router.push(formUrl)}>
                        <PlusOutlined /> {`Add ${objectName}`}
                    </Button>
                </div>
                <Table
                    // rowSelection={{
                    //     type: 'checkbox',
                    //     ...rowSelection,
                    //     hideSelectAll: true
                    // }}
                    className="table-striped-rows"
                    columns={prepareColumns(columns)}
                    dataSource={data || []}
                    rowKey="id"
                    pagination={{
                        pageSize: pageSize,
                    }}
                />
            </div>
        </div>
    )
}
export default ListContainer;