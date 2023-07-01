'use client'
import { ApiContext } from "@/context/ApiContext"
import React, { useContext } from "react"

const useApi = () => {
    return useContext(ApiContext)
}

export default useApi