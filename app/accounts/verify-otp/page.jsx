'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import HeroImg from '@/assets/HeroImage.png'
import Logo from '@/assets/Logo.png'
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { isValidEmail, isValidName, isValidPassword, isValidPhoneNumber, isValidUsername } from '@/utils/validators';
import useDebounce from '@/app/hooks/useDebouncer';
import useAuth from '@/app/hooks/useAuth';
import { handleApiError } from '@/utils/helpers';
import Loader from '@/components/Loader';
import OtpInput from '@/components/OTP';
const page = () => {
    const router = useRouter()
    const { getUserDetails, verifyOtp } = useAuth()
    
    let userId = window.sessionStorage.getItem('userId')
    const [userDetails, setUserDetails] = useState({})
    const [otp, setOtp] = useState([]);
    useEffect(() => {
        if (!userId) router.push('/accounts/register')
        else {
            getUserDetails(userId).then(res => {
                setUserDetails(res.data)
            })
        }
    }, [])

    const disableButton = () => {
        return otp.length < 4 || otp.includes("")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let otpNumber = ""
        otp.map(val => otpNumber = otpNumber + val)
        verifyOtp(userDetails?.email, Number(otpNumber)).then(res => {
            if(res.data.accessToken){
            sessionStorage.setItem('token',res.data.accessToken?.token)
            }
        }).catch(err => handleApiError(err)) 
    }
    if (userId) {
        return (
            <>
                <div className="min-h-screen flex justify-center items-center">
                    <div className="sign-up-form flex justify-center">
                        <div className='border-secondary border-opacity-30 flex flex-col justify-start py-4 px-2 items-center rounded-md min-w-[60%] max-w-[480px]' style={{ borderWidth: '0.2px' }}>
                            <Image className='scale-90 ' src={Logo} alt='logo' />
                            <form onSubmit={handleSubmit} className='mt-[40px] w-full sm:px-[47px] space-y-7'>
                                <div className="px-4">
                                    <p className='text-secondary font-normal text-center text-sm group relative'>
                                     Hey <span className='font-semibold'>{userDetails?.username}</span>. Please enter the OTP that has been sent to <span className='font-semibold'>{userDetails?.email}</span>
                                    </p>
                                    <div className="flex items-center my-4 justify-center">
                                    <OtpInput val={otp} setVal={setOtp} otpLength={4}/>
                                    </div>
                                    <Button disabled={disableButton()} className={'mt-[39px]'} text={'SUBMIT'} />
                                </div>
                            </form>
                            <p className='text-secondary mt-6 font-normal text-center text-base'>
                                Haven't received one yet? <span className='text-primary font-semibold cursor-pointer break-keep group relative'>Send OTP
                                    <span className='absolute w-0 h-px bg-gray-400 bottom-0 mt-2 left-1/2 transform -translate-x-1/2 transition-all duration-500 group-hover:w-4/5'></span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <Loader />
        )
    }
}

export default page