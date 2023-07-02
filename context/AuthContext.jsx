'use client'
import React, { useState } from "react"

export const AuthContext = React.createContext()
import axios from '@/app/api/axios'
import { endpoints } from "@/app/api/endpoints"
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    const [refreshToken, setRefreshToken] = useState(undefined)
    const [hideChatWindow, setHideChatWindow] = useState({})
    const login = (cred) => {
        return axios.post(endpoints.login, { email: cred?.username, password: cred.password })
    }

    const checkUsername = (username) => {
        return axios.post(endpoints.checkusername, { username })
    }


    const register = (cred) => {
        return axios.post(endpoints.register, { email: cred.phoneOrEmail, password: cred.password, username: cred.username, name: cred.fullname })
    }

    const getUserDetails = (id = "") => {
        return axios.get(endpoints.basicUserDetails + id)
    }

    const verifyOtp = (email, otp) => {
        return axios.post(endpoints.verifyOtp, { email, otp })
    }

    return (
        <AuthContext.Provider
            value={{
                auth, setAuth,
                hideChatWindow, setHideChatWindow,
                refreshToken, setRefreshToken,
                login,
                register,
                checkUsername,
                getUserDetails,
                verifyOtp,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}