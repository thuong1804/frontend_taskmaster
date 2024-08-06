import React, {  useState } from 'react';
import { Button, Drawer } from 'antd';

import TimeFrameTaskTable from '../time-frame-task';

const ModalShowListTask = ({
    dataProgress,
    userData,
    setReloadPage,
    reloadPage,
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
                    reloadPage={reloadPage}
                    userData={userData}
                    setReloadPage={setReloadPage}
                />
            </Drawer>
        </div>
    );
};
export default ModalShowListTask;