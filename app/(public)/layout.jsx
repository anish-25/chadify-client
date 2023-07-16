'use client'
import Loader from '@/components/Loader';
import PageTransition from '@/components/PageTransition';
import { AnimatePresence, motion } from 'framer-motion';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function PublicLayout({
  children,
}) {

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    Router.events.on("routeChangeStart", start)
    Router.events.on("routeChangeComplete", end)
    Router.events.on("routeChangeError", end)
    return () => {
      Router.events.off("routeChangeStart", start)
      Router.events.off("routeChangeComplete", end)
      Router.events.off("routeChangeError", end)
    }
  }, [])

  if (loading) {
    return <Loader />
  }
  else return (
    <>
      <AnimatePresence initial={false} mode="popLayout">
        <ToastContainer />
        {/* <PageTransition> */}
          {children}
        {/* </PageTransition> */}
      </AnimatePresence>
    </>
  )
}