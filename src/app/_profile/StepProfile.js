import { Button, Steps } from 'antd';
import React, { useState } from 'react'
import FormProfile from './FormProfile';
import FormChangePassword from './FormChangePassword';


export default function StepProfile({handleCancel}) {
    const [current, setCurrent] = useState(0);

    const steps = [
        {
            title: 'Profile',
            content: <FormProfile handleCancel={handleCancel} />,
        },
        {
            title: 'Change Password',
            content: <FormChangePassword handleCancel={handleCancel}/>,
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
            </div>
            <Steps current={current} items={items} />
        </>
    );
}
