'use client';
import Image from 'next/image';
import React, { forwardRef, useEffect, useState } from 'react'
import HeroImg from '@/assets/HeroImage.png'
import Logo from '@/assets/Logo.png'
import Input from '@/components/Input';
import Button from '@/components/Button';
import useAuth from '@/app/hooks/useAuth';
import { animations, handleApiError } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
const page = (props,ref) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [refreshToken, setRefreshToken] = useState({ set: false, value: undefined })
  const [userInputs, setUserInputs] = useState(
    {
      username: "",
      password: "",
    }
  )
  const { login, auth, setAuth } = useAuth()
  const handleLogin = (e) => {
    e.preventDefault()
    if (!loading) {
      setLoading(true)
      login(userInputs).then(res => {
        // sessionStorage.setItem('token', res.data.accessToken?.token)
        sessionStorage.setItem('rT', res.data.refreshToken?.token)
        sessionStorage.setItem('userId', res.data.id)
        setAuth(res.data)
        router.push('/' + res.data.username)
      }).catch(err => { handleApiError(err); setLoading(false) })
    }
  }
  const handleInputChange = (e, label) => {
    setUserInputs(prev => ({ ...prev, [label]: e.target.value }))
  }
  const disableButton = () => {
    return Object.values(userInputs).includes("") || userInputs.password.length < 5
  }

  useEffect(() => {
    setRefreshToken({ set: true, value: sessionStorage.getItem('rT') })
    if (auth?.accessToken) {
      router.push('/' + auth?.username)
    }
  }, [auth])
  if (!auth?.id) {
    return (
      <>
        <PageTransition ref={ref}>
        <ToastContainer enableMultiContainer={false} />
        <div className="min-h-screen flex justify-center items-center">
          <div className="hero-img absolute -left-10 -bottom-[60px] scale-75 hidden lg:block">
            <Image src={HeroImg} alt='giga-chad' />
          </div>
          <div className="hero-text flex-col items-center justify-center hidden md:flex w-[40%] lg:w-[60%]">
            <div className="text-left -mt-[90px] lg:-mr-[200px]">
              <h1 className='font-bold text-5xl'>LEVEL UP</h1>
              <h2 className='font-bold text-3xl mt-2'>YOUR <span className='text-secondary'>CHAD</span> GAME</h2>
              <h4 className='text-center font-bold text-lg mt-12 inline-block relative text-primary cursor-pointer group'>
                JOIN THE CHADVOLUTION
                <span className='absolute w-0 h-px bg-gray-400 bottom-0 mt-2 left-1/2 transform -translate-x-1/2 transition-all duration-500 group-hover:w-4/5'></span>
              </h4>
            </div>
          </div>
          <motion.div
            initial={animations.onTheRight}
            animate={animations.inTheCenter}
            exit={animations.onTheLeft}
            transition={animations.transition} className="sign-in-form flex justify-center w-[90%] md:w-[60%] lg:w-[50%]">
            <div className='border-secondary border-opacity-30 flex flex-col justify-start py-4 pb-12 px-2 items-center rounded-md min-w-[60%] max-w-[480px]' style={{ borderWidth: '0.2px' }}>
              <Image className='scale-90 ' src={Logo} alt='logo' />
              <form onSubmit={handleLogin} className='mt-[80px] w-full sm:px-[47px] space-y-10'>
                <Input type={'name'} onChange={(e) => handleInputChange(e, 'username')} value={userInputs.username} placeHolder={'Phone number, email or username'} />
                <Input type={'password'} onChange={(e) => handleInputChange(e, 'password')} value={userInputs.password} placeHolder={'Password'} />
                <div className="px-4">
                  <Button loading={loading} disabled={disableButton()} className={'mt-3'} text={'LOGIN'} />
                </div>
              </form>
              <p className='text-primary font-semibold text-base mt-[39px] cursor-pointer group relative'>
                Forgot Password?
                <span className='absolute w-0 h-px bg-gray-400 bottom-0 mt-2 left-1/2 transform -translate-x-1/2 transition-all duration-500 group-hover:w-4/5'></span>
              </p>
              <p className='text-secondary font-normal text-center text-base mt-[39px]'>
                Don't have an account yet? <span onClick={() => router.push('/accounts/register')} className='text-primary font-semibold cursor-pointer break-keep group relative'>Sign up
                  <span className='absolute w-0 h-px bg-gray-400 bottom-0 mt-2 left-1/2 transform -translate-x-1/2 transition-all duration-500 group-hover:w-4/5'></span>
                </span>
              </p>
            </div>
          </motion.div>
        </div>
        </PageTransition>
      </>
    )
  }
  else return <></>
}

export default forwardRef(page)