import React, { useState } from 'react'
import { Modal } from "antd";
import { AuditOutlined } from '@ant-design/icons'
import StepProfile from './StepProfile';
import styles from './page.module.scss'

export default function Profile() {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                onClick={showModal}> <AuditOutlined /> Profile
            </span>
            <Modal
                open={isModalOpen}
                footer={null}
                className={styles.modalContainer}
                onCancel={handleCancel}>
                    <StepProfile 
                        handleCancel={handleCancel} 
                        setIsModalOpen={setIsModalOpen}
                    />
            </Modal>
        </div>
    )
}
