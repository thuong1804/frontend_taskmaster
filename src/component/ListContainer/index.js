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
    pageSize = 5,
    actionButtons = {
        isEdit: false,
        isDelete: false,
    },
    deleteAction,
    dataList,
    filterParams,
    onGetListSuccess,
    onGetSelected,
    isSelectedField,
    filterData,
}) => {
    const [data, setData] = useState([])
    const { user } = useUser()
    const router = useRouter();
    const [searchParams, setSearchParams] = useSearchParams()
    const [keySelected, setKeySelected] = useState([])
    const [selected, setSelected] = useState([])
    const [currentPage, setCurrentPage] = useState('1')

    const confirm = async (e, id) => {
        await deleteAction(id).then(res => {
            if (res.data.result) {
                toast.success(`Delete ${objectName} success`)
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

    const rowSelection = {
        preserveSelectedRowKeys: false,
        selectedRowKeys: keySelected,
        onChange: (selectedRowKeys, selectedRows) => {
            setKeySelected(selectedRowKeys)
            setSelected(selectedRows)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    const fetchData = useCallback(async () => {
        try {
            if (getListAction) {
                const response = await getListAction({ ...filterParams });
                if (response.status === 200) {
                    setData(response.data.data.content || response.data.data);
                    onGetListSuccess?.(response.data.data.content || response.data.data)
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [getListAction, filterParams])

    const onChangeTabel = (page) => {
        setCurrentPage(page.currentPage)
    } 

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

    useEffect(() => {
        onGetSelected?.(keySelected, selected)
    }, [selected, keySelected])

    useEffect(() => {
        if (filterData) {
            setData(filterData)
        }
    }, [filterData])

    return (
        <div className={styles.container}>
            <span className={styles.title}>{title}</span>
            <div className={styles.actionFilter}>
                <SearchForm
                    searchField={searchFields}
                    setCurrentPage={setCurrentPage}
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
                    onChange={onChangeTabel}
                    rowSelection={isSelectedField && { 
                        type: 'checkbox',
                        ...rowSelection,
                        hideSelectAll: true
                    }}
                    className="table-striped-rows"
                    columns={prepareColumns(columns)}
                    dataSource={(filterData || data) || []}
                    rowKey="id"
                    pagination={{
                        pageSize: pageSize,
                        current: currentPage,
                    }}
                />
            </div>
        </div>
    )
}
export default ListContainer;