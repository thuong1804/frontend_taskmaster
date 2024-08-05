import React, {  useState } from 'react';
import { Button, Drawer } from 'antd';

import TimeFrameTaskTable from '../timeFrameTaskTable';

const ModalShowListTask = ({
    dataProgress,
    setReloadData,
    userData
}) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button type="primary" onClick={showDrawer}>
                List task progress
            </Button>
            <Drawer
                title="List task progress"
                onClose={onClose} open={open}
                placement='bottom'
                size={'large'}
            >
                <TimeFrameTaskTable
                    dataProgress={dataProgress}
                    setReloadData={setReloadData}
                    userData={userData}
                />

            </Drawer>
        </div>
    );
};
export default ModalShowListTask;