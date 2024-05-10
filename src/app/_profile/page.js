import React, { useState } from 'react'
import { Modal, Button } from "antd";
import { AuditOutlined, UserOutlined } from '@ant-design/icons'
import { useUser } from '@/context/ProfileProvider';
import FormProfile from './FormProfile';
import StepProfile from './StepProfile';
import styles from './page.module.scss'

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
        <div style={{width:'100%'}}>
            <span
                style={{display:'block', width:'100%'}}
                onClick={showModal}>
                    <AuditOutlined /> Profile
            </span>
            <Modal
                open={isModalOpen}
                footer={null}
                className={styles.modalContainer}
                onCancel={handleCancel}>
                    <StepProfile handleCancel={handleCancel}/>
            </Modal>
        </div>
    )
}
