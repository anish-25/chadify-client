import { useRouter } from "next/navigation"
import useAuth from "./useAuth"

export const useLogout = () => {
    const router = useRouter()
    const {setAuth} = useAuth()
    const logout = () => {
    localStorage.clear()
    sessionStorage.clear()
    setAuth({})
    router.push('/accounts/login')
}    
    return logout
}