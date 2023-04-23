'use client';

import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const {auth} = useAuth()
  // useEffect(() => {
  //   // if (!auth?.id) {
  //   //   router.push('/login')
  //   // }
  // }, [])

  return (
    <main className="">
        <button onClick={() => router.push('/login')}>Login</button>
    </main>
  )
}
