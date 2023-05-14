'use-client'
import Button from '@/components/Button'
import { Modal } from 'flowbite-react'
import Image from 'next/image'
import React, { useMemo, useRef, useState } from 'react'
import UploadIcon from 'remixicon-react/Upload2FillIcon'
import CloseIcon from 'remixicon-react/CloseLineIcon'

const AddPost = ({ show, setShow }) => {
    const imageRef = useRef(null)
    const [image,setImage] = useState(null)

    const handleUpload = (e) => {
        setImage(e.target.files[0])
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
                                <Image width={200} height={100} className='group-hover:opacity-50' src={URL.createObjectURL(image)}/>
                                <CloseIcon onClick={() => setImage(null)} size={35} style={{right:'40px',top:'20px'}} className='absolute hidden group-hover:block opacity-60 hover:!opacity-100 text-white bg-primary rounded-full'/>
                            </div>
                        }
                    </div>
                    <div style={{width:'40%',display:'flex',justifyContent:'center',minHeight: '60vh'}}>
                        asd
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