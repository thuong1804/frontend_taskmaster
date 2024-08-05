import { deleteTask, updateStatus } from '@/service/taskService';
import { PlusOutlined, EditOutlined, LineOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table, Tag } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react'
import { DATETIME_FORMAT_DISPLAY, TYPE } from "@/constant/constant";

import dayjs from 'dayjs';
import { toast } from 'sonner';
import urlPath from '@/constant/path';
import { commonStatus } from '@/constant/constant';
import SearchForm from '@/component/SearchForm/SearchForm';
import ModalShowListTask from './_modal-show-list-task/ModalShowListTask';
import styles from './TableTask.module.scss'
import { statusDDL } from '@/constant/masterData';
import { useUser } from '@/context/ProfileProvider';
import { useListUsers } from '@/context/UsersProvider';

export default function TableTask({
    data,
    setReloadData,
    userData,
}) {
    const [taskID, setTaskID] = useState([]);
    const [keyIdTaskProgress, setKeyIdTaskProgress] = useState([])
    const [titleTask, setTitleTask] = useState([]);


    const filterData = useMemo(() => {
        const dataRender = data.filter(item => item.status !== commonStatus.PROGRESS)
        return dataRender
    }, [data])

    const handelTaskProgress = async () => {
        const bodyData = {
            id: keyIdTaskProgress,
            status: commonStatus.PROGRESS
        }
        await updateStatus(bodyData)
        setKeyIdTaskProgress([])
        setReloadData(prevFlag => !prevFlag)
        toast.success(`Select ${titleTask} success`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.btnStartTask}>
                    <ModalShowListTask
                        dataProgress={data}
                        setReloadData={setReloadData}
                        userData={userData}
                    />
                    <Button
                        type="primary"
                        ghost
                        onClick={handelTaskProgress}
                        disabled={keyIdTaskProgress.length < 1}
                    >
                        Start task
                    </Button>
                </div>
        </div>
    )
}
