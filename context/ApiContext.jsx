'use client'
import React, { useState } from "react"

export const ApiContext = React.createContext()
import axios from '@/app/api/axios'
import { endpoints } from "@/app/api/endpoints"
import useAxiosPrivate from "@/app/hooks/useAxiosPrivate"
export const ApiProvider = ({ children }) => {
    // const axios = useAxiosPrivate()

    const getCompleteUserDetails = (id="") => {
        return axios.get(endpoints.userDetails+id,{headers:{'Authorization' : `Bearer ${sessionStorage.getItem('token')}`}})
    }

    const createPost = (post) => {
        return axios.post(endpoints.createPost,post,{headers:{'Authorization' : `Bearer ${sessionStorage.getItem('token')}`}})
    }

    const uploadFile = (data) => {
        return axios.post(endpoints.upload,data,{headers:{'Authorization' : `Bearer ${sessionStorage.getItem('token')}`}})
    }

    const searchUser = (keyword) => {
        return axios.post(endpoints.searchUser,{keyword},{headers:{'Authorization' : `Bearer ${sessionStorage.getItem('token')}`}})
    }

    const getTimeline = (user) => {
        return axios.get(endpoints.timeLinePosts+user,{headers:{'Authorization' : `Bearer ${sessionStorage.getItem('token')}`}})
    }

    const getUserPosts = (user) => {
        return axios.get(endpoints.userPosts+user,{headers:{'Authorization' : `Bearer ${sessionStorage.getItem('token')}`}})
    }

    return (
        <ApiContext.Provider
            value={{
                getCompleteUserDetails,
                createPost,
                uploadFile,
                searchUser,
                getTimeline,
                getUserPosts
            }}
            >
            {children}
        </ApiContext.Provider>
    )
}