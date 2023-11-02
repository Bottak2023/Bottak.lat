'use client'
import { useUser } from '@/context/Context'
import Link from 'next/link'
import { onAuth, handleSignOut } from '@/firebase/utils'
import { useRouter } from 'next/navigation';
import Particles from '@/components/Particles'

import { useEffect } from 'react'
import { getSpecificData } from '@/firebase/database'

export default function RootLayout({ children }) {

    const { user, userDB, setUserProfile, nav, setNav, state, setState, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas } = useUser()

    const router = useRouter()

    const signOutHandler = () => {
        handleSignOut()
        router.push('/')
        setUserProfile(null)
        setNav(false)
    }

    useEffect(() => {
        onAuth(setUserProfile)
        getSpecificData('currencies', setDivisas)  
      }, [])
    useEffect(() => {
        user && userDB === undefined && getSpecificData(`/users/${user.uid}`, setUserData)
    }, [user, userDB])

    return (
        <div className={`w-full`}>
            <nav className="w-screen fixed top-0 z-30 " style={{
                backgroundImage: 'url(/background.png)',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center ',
                backgroundSize: 'cover',
            }}>
                <div className="w-screen flex flex-wrap items-center justify-between bg-[#000000c7] mx-auto p-[10px] z-[1000]">
                    <a className="flex items-center">
                        <img src="/logo.svg" className="h-[50px]" alt="Flowbite Logo" />
                    </a>
                    <button type="button" className="inline-flex items-center text-gray-100 lg:hidden" onClick={() => setNav(!nav)}>
                        <span className="sr-only">Open menu</span>
                        <svg className="w-10 h-8" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"  ></path></svg>
                    </button>
                </div>
            </nav>

            <div className={`absolute min-h-screen bg-transparent  top-0 pt-[60px] items-center justify-between  w-[100vw] md:min-h-[70px] md:flex md:w-auto  transition-all	z-20 md:justify-end md:fixed md:top-[0px] md:z-50 md:p-0 md:w-[650px] md:right-[20px]  ${nav ? 'left-0 md:left-auto' : 'left-[-100vw] lg:left-auto'}`} >
                <ul className="flex flex-col bg-transparent p-4 border-t-[2px] border-gray-100 md:p-0 mt-4 font-regular text-[14px] lg:font-normal md:flex-row md:space-x-8 md:mt-0 md:border-0  ">

                    {userDB && userDB.rol && userDB.rol === 'Admin' && <li>
                        <Link href="/Admin" className="block py-2 pl-3 pr-4 text-gray-200 rounded md:bg-transparent md:p-0 " onClick={() => setNav(false)}>Admin</Link>
                    </li>}
                    <li>
                        <Link href="/" className="block py-2 pl-3 pr-4 text-gray-200 rounded md:bg-transparent md:p-0 " onClick={() => setNav(false)}>Remesas</Link>
                    </li>
                    <li>
                        <Link href="/Cambios" className="block py-2 pl-3 pr-4 text-gray-200 rounded md:bg-transparent md:p-0 " onClick={() => setNav(false)}>Cambios</Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 pl-3 pr-4 text-gray-200 rounded md:bg-transparent md:p-0 " onClick={() => setNav(false)}>Nosotros</Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" onClick={() => setNav(false)}>Servicios</Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" onClick={() => setNav(false)}>Politicas</Link>
                    </li>
                    <li>
                        <Link href="/Tracking" className="block py-2 pl-3 pr-4 text-gray-200 rounded md:bg-transparent md:p-0 " onClick={() => setNav(false)}>Tracking</Link>
                    </li>
                    {user !== null && user !== undefined
                        ? <li>
                            <button className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" onClick={signOutHandler}>Cerrar sesión</button>

                        </li>
                        : <li>
                            <Link href="/Login" className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" onClick={() => setNav(false)}>Iniciar Sesión</Link>
                        </li>
                    }
                </ul>
            </div>


            {divisas && divisas !== undefined && <div className={`absolute top-0 w-screen  h-screen p-[20px] lg:pb-0 pt-[90px] min-h-full  ${nav ? 'left-[-100vw]' : 'left-0'}`}>
                {children}
            </div>}

            <Particles />
        </div>
    )
}
