'use client';

import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const {auth} = useAuth()
  useEffect(() => {
    router.push('/anish25')
  }, [])

  return (
    <main className="">
       
    </main>
  )
}
