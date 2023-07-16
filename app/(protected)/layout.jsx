'use client'
import PrivateLayout from '@/components/PrivateLayout';
import useAuth from '../hooks/useAuth';
import { useEffect, useMemo } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import { ApiProvider } from '@/context/ApiContext';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProtectedLayout({
  children,
}) {
  const { auth, refreshToken, setRefreshToken } = useAuth()
  const refresh = useRefreshToken()
  const router = useRouter()
  useEffect(() => {
    let token = sessionStorage.getItem('rT')
    if (!auth?.accessToken?.token && token) {
      setRefreshToken(token)
      refresh()
    }
    else if (!token) {
      router.push('/accounts/login')
    }
  }, [auth])

  return useMemo(() => {
    if (auth?.accessToken) {
      return (
        <ApiProvider>
          <PrivateLayout>
            <ToastContainer position='top-center'/>
            {children}
          </PrivateLayout>
        </ApiProvider>)
    }
    else return <></>
  }, [auth])
}