'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Post from '@/components/Post'
import SearchBar from '@/components/SearchBar'
import axios from '../api/axios'
import AddPostButton from '@/components/AddPostButton'
import AddPost from '@/modals/AddPost'
import { getFireBaseFile } from '@/utils/helpers'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { endpoints } from '../api/endpoints'
import useApi from '../hooks/useApi'

const page = ({ params }) => {
  const [user, setUser] = useState({})
  const [caption,setCaption] = useState("")
  const { getCompleteUserDetails, getTimeline } = useApi()
  const router = useRouter()
  const [showAddPostModal, setShowAddPostModal] = useState(false)
  const [userPosts, setUserPosts] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const axiosPrivate = useAxiosPrivate()
  const refreshPosts = (userId) => {
    getCompleteUserDetails(userId).then(res => setUser(res.data))
    getTimeline(userId).then(res => setUserPosts(res.data))
  }

  useEffect(() => {
    let userId = sessionStorage.getItem('userId')
    axios.get('/refresh-token')
    if (params.user && userId) {
      refreshPosts(userId)
    }
    else {
      router.push('/accounts/login')
    }
  }, [])

  useEffect(() => {
    async function fetchImageUrls() {
      const urls = await Promise.all(
        userPosts.map(async (post) => {
          try {
            const url = await getFireBaseFile(post.user+'/'+post.media)
            return url;
          } catch (error) {
            console.error(`Error retrieving image URL for post with file path ${post.filePath}:`, error);
            return null;
          }
        })
      );
      axiosPrivate.get(endpoints.refreshToken)
      setImageUrls(urls);
    }
    fetchImageUrls();
  }, [userPosts]);

  if (user?._id) {
    return (
      // <PrivateLayout>
      <>
        <div className="flex relative flex-col h-screen justify-start w-full px-4">
          <div className="w-full h-[15%] sticky z-30 top-0 bg-[#FCFBFF]">
            <SearchBar />
          </div>
          <div className="w-full">
            {
              userPosts.map((post,index) => (
                <Post post={post} imageUrl={imageUrls[index]} />
              ))
            }
          </div>
          <div className="sticky flex justify-end items-center pb-[30px] bottom-0 right-0">
            <AddPostButton onClick={() => setShowAddPostModal(true)} />
          </div>
        </div>
        <AddPost refreshPosts={refreshPosts} caption={caption} setCaption={setCaption} setShow={setShowAddPostModal} show={showAddPostModal} />
        </>
      // </PrivateLayout>
    )
  }
}
export default page