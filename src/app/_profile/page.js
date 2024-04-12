import React, { useState } from 'react'
import { Modal, Button } from "antd";
import { AuditOutlined, UserOutlined } from '@ant-design/icons'
import { useUser } from '@/context/ProfileProvider';
import FormProfile from './form-profile';

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
                title={
                    <h3 style={{ textAlign: 'center', color: '#1677ff' }}>
                        Profile Information <UserOutlined />
                    </h3>}
                open={isModalOpen}
                footer={null}
                onCancel={handleCancel}>
                <FormProfile
                    setIsModalOpen={setIsModalOpen}
                />
            </Modal>
        </>
    )
}
