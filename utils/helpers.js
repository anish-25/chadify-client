import firebase from "@/app/firebase"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export const handleApiError = (err) => {
    const message = err?.response?.data?.message || "Something went wrong"
    toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        className: "bg-primary"
    })
}

export const handleLogout = () => {
    const router = useRouter()
    localStorage.clear()
    sessionStorage.clear()
    router.push('/accounts/login')
}

export const getFireBaseFile = async(path) => {
    try {
        const storageRef = firebase.storage().ref(path);
        const url = await storageRef.getDownloadURL();
        return url;
    } catch (error) {
        console.error(error);
    }
}