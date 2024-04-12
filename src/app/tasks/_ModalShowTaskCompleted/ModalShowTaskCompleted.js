import React, { useEffect, useState } from 'react'
import { Button, Modal, List } from 'antd';
import { getTask } from '@/service/taskService';
import { useUser } from '@/context/ProfileProvider';

export default function ModalShowTaskCompleted() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataCompleted, setDataCompleted] = useState([])
    const {user} = useUser();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    useEffect(() => {
        const fetchData = async() => {
            const dataBody = {
                userId: user?.id,
                groupId: user?.groupId,
                // page: queryPage ? queryPage : 1,
                // size: +querySize ? +querySize : +size
            };
            const response = await getTask(dataBody);
           setDataCompleted(response.data.data)
        }
        fetchData()
    }, [])

    console.log({dataCompleted})
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item
          actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
        >
            <List.Item.Meta
              title={<a href="https://ant.design">{item.name?.last}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <div>content</div>
            
        </List.Item>
                    )}
                />
            </Modal>
        </>
    )

}
