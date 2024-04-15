import React, { useState } from 'react'
import { Modal, Button } from "antd";
import { AuditOutlined, UserOutlined } from '@ant-design/icons'
import { useUser } from '@/context/ProfileProvider';
import FormProfile from './FormProfile';
import StepProfile from './StepProfile';

export default function Profile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useUser();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <span onClick={showModal}><AuditOutlined /> Profile</span>
            <Modal
                open={isModalOpen}
                footer={null}
                onCancel={handleCancel}>
                <StepProfile handleCancel={handleCancel}/>
            </Modal>
        </>
    )
}
