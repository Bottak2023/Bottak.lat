'use client'
import { useUser } from '@/context/Context'
import Navbar from '@/components/Navbar'
import { onAuth, handleSignOut } from '@/firebase/utils'
import { useRouter } from 'next/navigation';
import Particles from '@/components/Particles'

import { useEffect } from 'react'
import { getSpecificData } from '@/firebase/database'

export default function RootLayout({ children }) {

    const { user, userDB, setUserProfile, nav, setNav, state, setState, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, setCountries } = useUser()

    const router = useRouter()

    const signOutHandler = () => {
        handleSignOut()
        router.push('/')
        setUserProfile(null)
        setNav(false)
    }
    console.log(user)
    console.log(userDB)
    useEffect(() => {
        onAuth(setUserProfile)
        getSpecificData('divisas', setDivisas)
        getSpecificData(`/currencies/`, setCountries)
    }, [])
    useEffect(() => {
        user && userDB === undefined && getSpecificData(`/users/${user.uid}`, setUserData)
    }, [user, userDB])

    return (
        <>
            <Navbar />
            {divisas && divisas !== undefined && <div className={`relative  w-screen px-[10px]  pt-[80px] pb-[30px] md:pb-0 flex items-center min-h-full transition-all  ${nav ? 'left-[250px]' : 'left-0'}`}>
                {children}
            </div>}
            <Particles />
        </>
    )
}

