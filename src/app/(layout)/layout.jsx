'use client'
import { useUser } from '@/context/Context'
import Navbar from '@/components/Navbar'
import { onAuth, handleSignOut } from '@/firebase/utils'
import { useRouter } from 'next/navigation';
import Particles from '@/components/Particles'

import { useEffect } from 'react'
import { getSpecificData } from '@/firebase/database'

export default function RootLayout({ children }) {

    const { user, userDB, setUserProfile, nav, setNav, userNav, setNavItem, setUserNav, state, setState, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, setCountries } = useUser()
    const router = useRouter()
    console.log(user)
    console.log(userDB)

    function mainHandler () {
        setNavItem('')
        
    }


    useEffect(() => {
        onAuth(setUserProfile, setUserData)
        getSpecificData('divisas', setDivisas)
        getSpecificData(`/currencies/`, setCountries)
    }, [])
    useEffect(() => {
        user && userDB === undefined && getSpecificData(`/users/${user.uid}`, setUserData)
    }, [user, userDB])

    return (
        user !== undefined && userDB !== undefined && divisas !== undefined && <>
        {(userDB && user.bloqueado === true) || (userDB && userDB.bloqueado === true) ? <Modal funcion={soporte} close={true} cancel={signOutConfirm} cancelText="Cerrar sesión" successText="Contactar">
            Esta cuenta esta bloqueada, <br />por favor comuniquese con soporte.<br />
          </Modal> : ''}
            <Navbar/>
            <div className={`relative  w-screen px-[20px]  pt-[80px] pb-[30px] md:pb-0 flex items-center min-h-full   ${nav ? 'left-[100vw] sm:left-[250px]' : 'left-0'} ${userNav ? 'top-[70px]' : 'top-0'}`} style={{transition: 'all .02s linear'}} onClick={mainHandler}>
                {children}
            </div>
            <Particles />
        </>
    )
}

