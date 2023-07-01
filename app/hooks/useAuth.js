'use client'
import { AuthContext } from "@/context/AuthContext"
import React, { useContext } from "react"

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth