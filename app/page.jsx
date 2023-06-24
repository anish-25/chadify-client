'use client';

import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const { auth, getUserDetails } = useAuth()
  useEffect(() => {
    const user = sessionStorage.getItem('userId')
    const token = sessionStorage.getItem('token')
    if (user && token) {
      getUserDetails(user).then(res => {
        router.push(`/${res.data?.username}`)
      }).catch(err => router.push('/accounts/login'))
    } else {
      router.push('/accounts/login')
    }
  }, [])

  return (
    <main className="">

    </main>
  )
}
