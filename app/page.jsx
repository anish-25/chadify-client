'use client';

import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const { auth, getUserDetails } = useAuth()
  useEffect(() => {
    if (auth?.id) {
      router.push('/'+auth?.username)
    } else {
      router.push('/accounts/login')
    }
  }, [])

  return (
    <main className="">

    </main>
  )
}
