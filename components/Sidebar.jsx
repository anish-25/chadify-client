import React from 'react'
import Logo from '@/assets/Logo.png'
import { FrontFacingChad, Home, NotificationBell, SearchLens, SettingsGear } from '@/assets/icons'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import Logout from 'remixicon-react/LogoutBoxLineIcon'
import Link from 'next/link'
import Button from './Button'
import useAuth from '@/app/hooks/useAuth'
import { useLogout } from '@/app/hooks/useLogout'
import { toast } from 'react-toastify'

const Sidebar = ({ view }) => {
    const { auth } = useAuth()
    const links = [
        {
            name: 'Home',
            icon: Home,
            path: '/' + auth?.username,
            tbd: false,
        },
        {
            name: 'Search',
            icon: SearchLens,
            path: '/',
            tbd: true,
        },
        {
            name: 'Notifications',
            icon: NotificationBell,
            path: '/',
            tbd: true,
        },
        {
            name: 'Settings',
            icon: SettingsGear,
            path: '/',
            tbd: true,
        },
        {
            name: 'Profile',
            icon: FrontFacingChad,
            path: '/profiles/' + auth?.username,
            tbd: false,
        },
    ]
    const router = useRouter()
    const { hideChatWindow, setHideChatWindow } = useAuth()
    const logout = useLogout()

    const handleRouteChange = (link) => {
        if (link.tbd) {
            toast.info("This menu is currently under development. Please try again later.", {
                position: 'top-center',
                autoClose: 5000,
            })
        } else {
            router.push(link.path)
        }
    }

    if (view === "desktop") {
        return (
            <div className='flex flex-col w-full h-screen p-2 justify-start items-start'>
                <div className="flex justify-start items-start h-[10%]">
                    <Image src={Logo} className='scale-75 cursor-pointer' onClick={() => router.push('/' + auth?.username)} />
                </div>
                <div className="flex flex-col w-full justify-center mb-32 items-center h-[90%] pl-8 space-y-[40px] text-secondary font-semibold">
                    {
                        links.map(link => (
                            <div
                                onClick={() => handleRouteChange(link)} className="flex w-full justify-start items-center space-x-3 hover:opacity-100 opacity-80 cursor-pointer transition-all duration-200">
                                <Image src={link.icon} alt='nav-icon' width={22} height={20} />
                                <div className="">{link.name}</div>
                            </div>
                        ))
                    }
                </div>
                <div className="flex justify-center w-full items-end mb-14">
                    <button onClick={() => {
                        logout()
                    }} className='flex justify-center items-end space-x-3'>
                        <Logout color='red' />
                        <span className='text-red-500 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        )
    }
    else if (view === "mobile") {
        return (
            <div className="w-full flex justify-around items-center bg-gray-200 min-h-[60px]">
                {links.map(link => (
                    <Image alt='nav-icon' className='cursor-pointer' src={link.icon} height={20} width={20} onClick={() => handleRouteChange(link)} />
                ))}
            </div>
        )
    }
    else return <></>
}

export default Sidebar