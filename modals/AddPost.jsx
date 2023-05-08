'use-client'
import { Modal } from 'flowbite-react'
import React, { useMemo, useRef, useState } from 'react'

const AddPost = ({ show, setShow }) => {
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
                    <div className="space-y-6" style={{ minHeight: '60vh', display: 'flex', alignItems: 'end', paddingBottom: '40px' }}>

                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer style={{ padding: '12px', position: 'absolute' }}>

            </Modal.Footer>
        </Modal>
    )
}

export default AddPost