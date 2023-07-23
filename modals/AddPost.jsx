'use-client'
import Button from '@/components/Button'
import { Modal } from 'flowbite-react'
import Image from 'next/image'
import React, { useMemo, useRef, useState } from 'react'
import UploadIcon from 'remixicon-react/Upload2FillIcon'
import CloseIcon from 'remixicon-react/CloseLineIcon'
import { FrontFacingChad } from '@/assets/icons'
import Search from '@/components/Search'
import useApi from '@/app/hooks/useApi'
import { motion } from 'framer-motion'

const AddPost = ({ show, setShow,caption,setCaption,refreshPosts }) => {
    const imageRef = useRef(null)
    const [image,setImage] = useState(null)
    const {createPost,uploadFile} = useApi()
    const AnimatedModal = motion(Modal);

    const handleUpload = (e) => {
        setImage(e.target.files[0])
    }
    const handleCreatePost = async() => {
        const user = sessionStorage.getItem('userId')
        const data = {
            user,
            mediaType : 'image',
            caption, 
        }
        if(image){
            const form = new FormData()
            // const fileName = user+'.png'
            const fileName = user+Date.now()+image.name
            form.append("name",fileName)
            form.append("file",image)
            data.media = fileName
            try{
            await uploadFile(form).then(async res => {
                await createPost(data)
            }).finally(() => {setShow(false);refreshPosts(user)})
            }catch(err){
                console.log(err)
            }
        }
    }
    const handleClose = () => {
        setShow(prev => ({...prev,open:false}))
    }
    return (
        <Modal
            dismissible={true}
            show={show}
            size={'5xl'}
            position={'center'}
            onClose={handleClose}
        >
            <Modal.Header>
                Create a new Post
            </Modal.Header>
            <Modal.Body style={{ position: 'relative' }}>
                <div className="space-y-6 relative" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    <div className="space-y-6 flex-col md:flex-row" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
                    <div className='border flex-col space-y-4 md:w-[60%] w-full' style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:"40vh"}}>
                        {
                            !image ?
                            <>
                            <UploadIcon size={50} opacity={0.2}/>
                            <Button text={'Upload Image'} onClick={() => imageRef.current.click()} style={{width:'40%'}}/>
                            <input type="file" onChange={handleUpload} ref={imageRef} accept='image/png, image/jpeg' className='hidden' />
                            </>
                            :
                            <div style={{minHeight:'58vh'}} className="relative group w-full h-full flex justify-center items-center transition-all duration-150 cursor-pointer hover:bg-gray-100">
                                <Image width={200} alt='uploaded-image' height={100} className='group-hover:opacity-50' src={URL.createObjectURL(image)}/>
                                <CloseIcon onClick={() => setImage(null)} size={35} style={{right:'40px',top:'20px'}} className='absolute hidden group-hover:block opacity-60 hover:!opacity-100 text-white bg-primary rounded-full'/>
                            </div>
                        }
                    </div>
                    <div className='md:w-[40%] w-full md:!min-h-[60vh] min-h-[40vh]' style={{display:'flex',flexDirection:"column",padding:'20px',justifyContent:'start'}}>
                     <div style={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                     <Image style={{marginRight:'8px'}} src={FrontFacingChad} alt='profile-picture' width={24} height={24}/>
                     <span style={{fontWeight:'400'}} className='text-secondary'>anish25</span>
                     </div>
                    <Search caption={caption} setCaption={setCaption}/>
                    <div className="flex md:relative justify-center items-center w-full mt-12 sticky bottom-0 pb-10">
                    <Button disabled={!image?.name} text={'Share'} onClick={handleCreatePost} style={{width:'40%',height:'30px'}}/>
                    </div>
                    </div>
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer style={{ padding: '12px', position: 'absolute' }}>

            </Modal.Footer>
        </Modal>
    )
}

export default AddPost