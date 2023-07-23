import React from 'react'
import AddPost from './AddPost'
import useAuth from '@/app/hooks/useAuth'
import useApi from '@/app/hooks/useApi'

const Modals = () => {
    const { caption, setCaption, setShowAddPostModal, showAddPostModal } = useAuth()
    const { refreshUserPosts, refreshTimeline } = useApi()
    return (
        <>
            <AddPost refreshPosts={showAddPostModal?.timeline === true ? refreshTimeline : refreshUserPosts} caption={caption} setCaption={setCaption} setShow={setShowAddPostModal} show={showAddPostModal.open} />
        </>
    )
}

export default Modals