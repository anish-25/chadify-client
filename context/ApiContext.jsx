'use client'
import React, { useState } from "react"

export const ApiContext = React.createContext()
import { endpoints } from "@/app/api/endpoints"
import useAxiosPrivate from "@/app/hooks/useAxiosPrivate"
export const ApiProvider = ({ children }) => {
    const axios = useAxiosPrivate()

    const getCompleteUserDetails = (id="") => {
        return axios.get(endpoints.userDetails+id)
    }

    const createPost = (post) => {
        return axios.post(endpoints.createPost,post)
    }

    const uploadFile = (data) => {
        return axios.post(endpoints.upload,data)
    }

    const searchUser = (keyword) => {
        return axios.post(endpoints.searchUser,{keyword})
    }

    const getTimeline = (user) => {
        return axios.get(endpoints.timeLinePosts+user)
    }

    const getUserPosts = (user) => {
        return axios.get(endpoints.userPosts+user)
    }

    const updateUser = (id,data) => {
        return axios.put(endpoints.userDetails+id,data)
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
                updateUser
            }}
            >
            {children}
        </ApiContext.Provider>
    )
}