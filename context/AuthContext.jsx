'use client'
import React, { useState } from "react"

export const AuthContext = React.createContext()
import axios from '@/app/api/axios'
import { endpoints } from "@/app/api/endpoints"
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})

    const login = (cred) => {
        return axios.post(endpoints.login,{email:cred?.username,password:cred.password})
    }

    const checkUsername = (username) => {
        return axios.post(endpoints.checkusername,{username})
    }
    

    const register = (cred) => {
        return axios.post(endpoints.register,{email : cred.phoneOrEmail, password: cred.password, username: cred.username, name: cred.fullname})
    }

    const getUserDetails = (id="") => {
        return axios.get(endpoints.basicUserDetails + id)
    }

    const verifyOtp = (email,otp) => {
        return axios.post(endpoints.verifyOtp, {email,otp})
    }

    const getCompleteUserDetails = (id="") => {
        return axios.get(endpoints.userDetails+id,{headers:{'Authorization' : `Bearer ${sessionStorage.getItem('token')}`}})
    }

    const createPost = (post) => {
        return axios.post(endpoints.createPost,post,{headers:{'Authorization' : `Bearer ${sessionStorage.getItem('token')}`}})
    }

    return (
        <AuthContext.Provider
            value={{
                auth, setAuth,
                login,
                register,
                checkUsername,
                getUserDetails,
                verifyOtp,
                getCompleteUserDetails,
                createPost
            }}
            >
            {children}
        </AuthContext.Provider>
    )
}