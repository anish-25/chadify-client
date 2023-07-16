import useAuth from '@/app/hooks/useAuth'
import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { useState } from 'react';
import useApi from '@/app/hooks/useApi';
import { toast } from 'react-toastify';
import { handleApiError } from '@/utils/helpers';
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const ChangeProfilePic = ({ open, setOpen, user,setUserDetails }) => {
    const { auth } = useAuth()
    const { updateUser, uploadFile } = useApi()
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: `${user?.username}.png`,
            status: 'done',
            url: user?.avatar,
        },
    ]);
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <div className='w-full flex flex-col justify-center items-center'>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const handleUpload = async () => {
        if (fileList.length && fileList[0].size) {
            const form = new FormData()
            const fileName = auth?.id + '.png'
            form.append("avatar", true)
            form.append("name", fileName)
            form.append("file", fileList[0].originFileObj)
            try {
                await uploadFile(form).then(async res => {
                    toast.success("Profile picture updated")
                    setUserDetails()
                }).finally(() => {
                    setOpen(false)
                })
            } catch (err) {
                handleApiError(err)
            }
        }
        else{
            setOpen(false)
        }
    }

    return (
        <Modal title="Change Profile Picture" okText={"Save"} okButtonProps={{className:"bg-primary hover:!bg-primary hover:!opacity-80"}} onOk={handleUpload} centered onCancel={() => setOpen(false)} open={open}>
            <Upload
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                className='flex justify-center items-center w-fit'
                maxCount={1}
                accept='image/*'
            >
                {fileList.length > 0 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>

        </Modal>
    )
}

export default ChangeProfilePic