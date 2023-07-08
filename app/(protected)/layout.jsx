'use client'
import PrivateLayout from '@/components/PrivateLayout';
import useAuth from '../hooks/useAuth';
import { useEffect, useMemo } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import { ApiProvider } from '@/context/ApiContext';

export default function ProtectedLayout({
  children,
}) {
  const { auth, refreshToken, setRefreshToken } = useAuth()
  const refresh = useRefreshToken()
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
            {children}
          </PrivateLayout>
        </ApiProvider>)
    }
    else return <></>
  }, [auth])
}