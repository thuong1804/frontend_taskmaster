import { Button, Steps } from 'antd';
import React, { useState } from 'react'
import FormProfile from './FormProfile';
import FormChangePassword from './FormChangePassword';
import styles from './StepProfile.module.scss'

export default function StepProfile({ 
    handleCancel,
    setIsModalOpen,
}){
    const [current, setCurrent] = useState(0);
    const formId = 'form-profile'
    const steps = [
        {
            title: 'Profile',
            content: <FormProfile handleCancel={handleCancel} formId={formId}/>,
        },
        {
            title: 'Change Password',
            content: <FormChangePassword handleCancel={handleCancel} formId={formId}/>,
        },

    ];

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        marginTop: 16,
    };
    return (
        <>
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginBottom: '25px' }}>
                <div className={styles.actionButton}>
                    {current < steps.length - 1 && (
                        <Button onClick={() => next()}>
                            Change Password
                        </Button>
                    )}
                    {current > 0 && (
                        <Button
                            style={{
                                margin: '0 8px',
                            }}
                            onClick={() => prev()}
                        >
                            Profile
                        </Button>
                    )}
                    <div className={styles.floatRightButton}>
                        <Button htmlType="button" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" form={formId}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
            <Steps 
                current={current} 
                // items={items} 
                progressDot
            />
        </>
    );
}
