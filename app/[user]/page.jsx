'use client'
import useAuth from '@/app/hooks/useAuth'
import PrivateLayout from '@/components/PrivateLayout'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Post from '@/components/Post'
import SearchBar from '@/components/SearchBar'
import axios from '../api/axios'
import { posts } from '@/data/posts'
import AddPostButton from '@/components/AddPostButton'
import AddPost from '@/modals/AddPost'

const page = ({ params }) => {
  const [user, setUser] = useState({})
  const [caption,setCaption] = useState("")
  const { getCompleteUserDetails } = useAuth()
  const router = useRouter()
  const [showAddPostModal, setShowAddPostModal] = useState(false)
  useEffect(() => {
    let userId = sessionStorage.getItem('userId')
    axios.get('/refresh-token')
    if (params.user && userId) {
      getCompleteUserDetails(userId).then(res => setUser(res.data))
    }
    else {
      router.push('/accounts/login')
    }
  }, [])

  if (user?._id) {
    return (
      <PrivateLayout>
        <div className="flex relative flex-col h-screen justify-start w-full px-4">
          <div className="w-full h-[15%] sticky z-30 top-0 bg-[#FCFBFF]">
            <SearchBar />
          </div>
          <div className="w-full">
            {
              posts.map(post => (
                <Post post={post} />
              ))
            }
          </div>
          <div className="sticky flex justify-end items-center pb-[30px] bottom-0 right-0">
            <AddPostButton onClick={() => setShowAddPostModal(true)} />
          </div>
        </div>
        <AddPost caption={caption} setCaption={setCaption} setShow={setShowAddPostModal} show={showAddPostModal} />

      </PrivateLayout>
    )
  }
}
export default page