'use client';
import Image from 'next/image';
import React, { forwardRef, useEffect, useState } from 'react'
import HeroImg from '@/assets/HeroImage.png'
import Logo from '@/assets/Logo.png'
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { isValidEmail, isValidName, isValidPassword, isValidPhoneNumber, isValidUsername } from '@/utils/validators';
import useDebounce from '@/app/hooks/useDebouncer';
import useAuth from '@/app/hooks/useAuth';
import { handleApiError } from '@/utils/helpers';
import PageTransition from '@/components/PageTransition';
const page = (props,ref) => {
    const router = useRouter()
    const { checkUsername, register } = useAuth()
    const [userInputs, setUserInputs] = useState({
        phoneOrEmail: "",
        fullname: "",
        username: "",
        password: "",
    })
    const [errors, setErrors] = useState({
        phoneOrEmail: "",
        fullname: "",
        username: "",
        password: "",
    })
    const debounced = useDebounce(userInputs.username, 500)
    useEffect(() => {
        if (debounced.length) {
            if (!errors.username.length) {
                checkUsername(debounced).then(res => {
                    setErrors(prev => ({ ...prev, username: "" }))
                }).catch(err => {
                    if (err.response.data.userExists) {
                        setErrors(prev => ({ ...prev, username: "This username has been taken already" }))
                    }
                })
            }
        }
    }, [debounced])


    const handleInputsChange = (e, label) => {
        let error = ""
        if (!e.target.value?.trim().length) error = "This field is required."
        else {
            if (label == "phoneOrEmail") {
                if (!isValidEmail(e.target.value) && !isValidPhoneNumber(e.target.value))
                    error = "Please enter a valid Email Id or Phone number"
            }
            if (label == "fullname") {
                if (!isValidName(e.target.value))
                    error = "Name should contain only alphabets and space"
            }
            if (label == "username") {
                if (!isValidUsername(e.target.value))
                    error = "Usernames can only use letters, numbers, underscores, periods and should contain atleast 3 characters"
            }
            if (label == "password") {
                if (!isValidPassword(e.target.value))
                    error = "The password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
            }
        }

        setUserInputs(prev => ({ ...prev, [label]: e.target.value }))
        setErrors(prev => ({ ...prev, [label]: error }))
    }

    const handleRegister = (e) => {
        e.preventDefault()
        if (!disableButton()) {
            register(userInputs).then(res => {
                sessionStorage.setItem('username', userInputs.username)
                sessionStorage.setItem('userId', res.data?.id)
                sessionStorage.setItem('email', userInputs.phoneOrEmail)
                router.push('/accounts/verify-otp')
            }).catch(err => {
                handleApiError(err)
            })
        }
    }

    const disableButton = () => {
        return Object.values(userInputs).includes("") || Object.values(errors).filter(err => err.length > 0).length > 0
    }

    return (
        <>
            <PageTransition ref={ref}>
                <div className="min-h-screen flex justify-center items-center">
                    <div className="sign-up-form flex justify-center">
                        <div className='border-secondary border-opacity-30 flex flex-col justify-start py-4 px-2 items-center rounded-md min-w-[60%] max-w-[480px] min-h-[600px]' style={{ borderWidth: '0.2px' }}>
                            <Image className='scale-90 ' src={Logo} alt='logo' />
                            <form onSubmit={handleRegister} className='mt-[40px] w-full sm:px-[47px] space-y-7'>
                                <Input type={'name'} error={errors.phoneOrEmail} value={userInputs.phoneOrEmail} onChange={(e) => handleInputsChange(e, 'phoneOrEmail')} placeHolder={'Phone Number or Email'} />
                                <Input type={'name'} error={errors.fullname} value={userInputs.fullname} onChange={(e) => handleInputsChange(e, 'fullname')} placeHolder={'Full Name'} />
                                <Input type={'name'} error={errors.username} value={userInputs.username} onChange={(e) => handleInputsChange(e, 'username')} placeHolder={'Username'} />
                                <Input type={'password'} error={errors.password} value={userInputs.password} onChange={(e) => handleInputsChange(e, 'password')} placeHolder={'Password'} />
                                <div className="px-4">
                                    <p className='text-secondary font-normal text-center text-sm cursor-pointer group relative'>
                                        By signing up, you agree to our Terms , Privacy Policy
                                        and Cookies Policy .
                                    </p>
                                    <Button disabled={disableButton()} className={'mt-[39px]'} text={'SIGN UP'} />
                                </div>
                            </form>
                            <p className='text-secondary mt-6 font-normal text-center text-base'>
                                Have an account already? <span onClick={() => router.push('/accounts/login')} className='text-primary font-semibold cursor-pointer break-keep group relative'>Sign in
                                    <span className='absolute w-0 h-px bg-gray-400 bottom-0 mt-2 left-1/2 transform -translate-x-1/2 transition-all duration-500 group-hover:w-4/5'></span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </PageTransition>
        </>
    )
}

export default forwardRef(page)