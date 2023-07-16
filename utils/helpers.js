import firebase from "@/app/firebase"
import useAuth from "@/app/hooks/useAuth"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export const handleApiError = (err) => {
    const message = err?.response?.data?.message || "Something went wrong"
    toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
    })
}

export const handleLogout = () => {
    const router = useRouter()
    const { setAuth } = useAuth()
    localStorage.clear()
    sessionStorage.clear()
    setAuth({})
    router.push('/accounts/login')
}

export const getFireBaseFile = async (path) => {
    try {
        const storageRef = firebase.storage().ref(path);
        const url = await storageRef.getDownloadURL();
        return url;
    } catch (error) {
        console.error(error);
    }
}

export const animations = {
    onTheRight: { x: '100%' },
    inTheCenter: { x: 0 },
    onTheLeft: { x: '-100%' },
    transition: { duration: 0.6, ease: 'easeInOut' }
}