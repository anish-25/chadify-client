'use client'
import React, { useState } from "react"

export const ApiContext = React.createContext()
import { endpoints } from "@/app/api/endpoints"
import useAxiosPrivate from "@/app/hooks/useAxiosPrivate"
import useAuth from "@/app/hooks/useAuth"
export const ApiProvider = ({ children }) => {
    const axios = useAxiosPrivate()
    const { auth } = useAuth()

    const [userTimeline, setUserTimeline] = useState([])
    const [userPosts, setUserPosts] = useState([])

    const getCompleteUserDetails = (id = "") => {
        return axios.get(endpoints.userDetails + id)
    }

    const createPost = (post) => {
        return axios.post(endpoints.createPost, post)
    }

    const uploadFile = (data) => {
        return axios.post(endpoints.upload, data)
    }

    const searchUser = (keyword) => {
        return axios.post(endpoints.searchUser, { keyword })
    }

    const getTimeline = (user) => {
        return axios.get(endpoints.timeLinePosts + user)
    }

    const getUserPosts = (user) => {
        return axios.get(endpoints.userPosts + user)
    }

    const updateUser = (id, data) => {
        return axios.put(endpoints.userDetails + id, data)
    }

    const followUser = (requestedBy, userToFollow) => {
        return axios.post(endpoints.follow, { requestedBy, userToFollow })
    }

    const refreshtimeline = () => {
        let userId = auth?.id
        getTimeline(userId).then(res => setUserTimeline(res.data))
    }

    const refreshUserPosts = () => {
        let userId = auth?.id
        getUserPosts(userId).then(res => setUserPosts(res.data))
    }

    return (
        <ApiContext.Provider
            value={{
                getCompleteUserDetails,
                createPost,
                uploadFile,
                searchUser,
                getTimeline,
                getUserPosts,
                updateUser,
                followUser,
                refreshtimeline,
                userTimeline, setUserTimeline,
                refreshUserPosts,
                userPosts, setUserPosts,
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}