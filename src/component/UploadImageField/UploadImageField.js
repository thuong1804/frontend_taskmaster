import React, { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload, Image } from 'antd';
import { useUser } from '@/context/ProfileProvider';
import { handelDeleteAvatar, handelUploadAvatar } from '@/service/user-service';



const UploadImageField = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [file, setFile] = useState();
    const { user } = useUser();
    const storage =  user.avatar ? `http://localhost:3005/${user.avatar}` : null
    const [fileList, setFileList] = useState([])
    
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {
        setFile(file);
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    
    const handleChange = (info) => {
        switch (info.file.status) {
            case 'uploading':
                setFileList([info.file]);
                setLoading(true);
                break;
            case 'done':
                getBase64(info.file.originFileObj, (url) => {
                    setLoading(false);
                    setImageUrl(url);
                    setFileList([info.file]);
                });
                break;
            case 'removed':
                setFileList([...info.fileList]);
                break;
            default:
                break;
        }
    };
    
    useEffect(() => {
        if (user.avatar) {
            setFileList([
                {
                    uid: '1',
                    name: 'image.png',
                    status: 'done',
                    url: storage,
                }
            ]);
        }
    }, [user.avatar]);

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    const uploadFile = async ({ _, onSuccess }) => {
        const formDataToSend = new FormData();
        formDataToSend.append('avatar', file);
        formDataToSend.append('id', user.id);
        await handelUploadAvatar(formDataToSend).then(res => {
            if (res.data.result) {
                onSuccess(res.data.data)
            }
        })
    }

    const removeFile = async (file) => {
        const fileData = {
            id: user.id,
            imgName: user.avatar ? user.avatar : file.name,
            imgPath: file.url
        }
        await handelDeleteAvatar(fileData)
        return true;
    }

    return (
        <Upload
            listType="picture-circle"
            fileList={fileList}
            showUploadList={{
                showPreviewIcon: false,
                showRemoveIcon: true, 
            }}
            customRequest={uploadFile}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            onRemove={removeFile}
        >
            {fileList.length < 1 && uploadButton}
        </Upload>
    );
};
export default UploadImageField;