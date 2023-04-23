import { toast } from "react-toastify"

export const handleApiError = (err) => {
    const message  = err?.response?.data?.message || "Something went wrong"
    toast.error(message,{
        position:'top-center',
        autoClose: 5000,
        className: "bg-primary"
    })
}