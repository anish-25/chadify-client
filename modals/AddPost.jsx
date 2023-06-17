'use-client'
import Button from '@/components/Button'
import { Modal } from 'flowbite-react'
import Image from 'next/image'
import React, { useMemo, useRef, useState } from 'react'
import UploadIcon from 'remixicon-react/Upload2FillIcon'
import CloseIcon from 'remixicon-react/CloseLineIcon'
import { FrontFacingChad } from '@/assets/icons'
import Search from '@/components/Search'
import useAuth from '@/app/hooks/useAuth'
import axios from '@/app/api/axios'

const AddPost = ({ show, setShow,caption,setCaption,refreshPosts }) => {
    const imageRef = useRef(null)
    const [image,setImage] = useState(null)
    const {createPost,uploadFile} = useAuth()
    
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
    return (
        <Modal
            dismissible={true}
            show={show}
            size={'5xl'}
            position={'center'}
            onClose={() => setShow(false)}
        >
            <Modal.Header>
                Create a new Post
            </Modal.Header>
            <Modal.Body style={{ position: 'relative' }}>
                <div className="space-y-6" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    <div className="space-y-6" style={{ minHeight: '60vh', display: 'flex', alignItems: 'end' }}>
                    <div className='border h-full flex-col space-y-4' style={{minHeight: '60vh',width:'60%',display:'flex',justifyContent:'center',alignItems:'center'}}>
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
                    <div style={{width:'40%',display:'flex',flexDirection:"column",padding:'20px',justifyContent:'start',minHeight: '60vh'}}>
                     <div style={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                     <Image style={{marginRight:'8px'}} src={FrontFacingChad} alt='profile-picture' width={24} height={24}/>
                     <span style={{fontWeight:'400'}} className='text-secondary'>anish25</span>
                     </div>
                    <Search caption={caption} setCaption={setCaption}/>
                    <div className="flex justify-center items-center w-full mt-12">
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