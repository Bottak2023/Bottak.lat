'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useUser } from '@/context/Context'
import { useRouter } from 'next/navigation';

export default function Navbar({ children }) {
    const { user, userDB, setUserProfile, nav, setNav, state, setState, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, setCountries } = useUser()

    const router = useRouter()

    const signOutHandler = () => {
        handleSignOut()
        router.push('/')
        setUserProfile(null)
        setNav(false)
    }
 
    return (
        <>
            <nav className="w-screen fixed top-0 z-50 " >
                <div className="absolute top-0 w-screen  h-[70px]" style={{
                    backgroundImage: 'url(/background.png)',
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center ',
                    backgroundSize: 'cover',
                }}>
                    <div className="absolute top-0 w-screen  flex flex-wrap items-center justify-between mx-auto p-[10px] z-50" style={{
                        backgroundImage: 'linear-gradient(#000000c7, #000000c7)',
                    }}>
                        <a className="flex items-center">
                            <img src="/logo.svg" className="h-[50px]" alt="Flowbite Logo" />
                        </a>

                        <div className='pt-[10px]'>

                            <button type="button" className="inline-flex items-center text-gray-100 ml-4" onClick={() => setNav(!nav)}>
                                <span className="sr-only">Open menu</span>
                                <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 13.2C15.5313 13.2 15.9769 13.0848 16.3369 12.8544C16.6969 12.624 16.8762 12.3392 16.875 12V8.4C16.875 8.06 16.695 7.7748 16.335 7.5444C15.975 7.314 15.53 7.1992 15 7.2C14.4688 7.2 14.0231 7.3152 13.6631 7.5456C13.3031 7.776 13.1238 8.0608 13.125 8.4V12C13.125 12.34 13.305 12.6252 13.665 12.8556C14.025 13.086 14.47 13.2008 15 13.2ZM15 16.8C15.5313 16.8 15.9769 16.6848 16.3369 16.4544C16.6969 16.224 16.8762 15.9392 16.875 15.6C16.875 15.26 16.695 14.9748 16.335 14.7444C15.975 14.514 15.53 14.3992 15 14.4C14.4688 14.4 14.0231 14.5152 13.6631 14.7456C13.3031 14.976 13.1238 15.2608 13.125 15.6C13.125 15.94 13.305 16.2252 13.665 16.4556C14.025 16.686 14.47 16.8008 15 16.8ZM1.87501 20.4C1.34376 20.4 0.898131 20.2848 0.538132 20.0544C0.178132 19.824 -0.00124351 19.5392 6.48787e-06 19.2C6.48787e-06 18.86 0.180007 18.5748 0.540006 18.3444C0.900006 18.114 1.34501 17.9992 1.87501 18H3.75001V9.6C3.75001 7.94 4.53125 6.4648 6.09375 5.1744C7.65625 3.884 9.6875 3.0392 12.1875 2.64V1.8C12.1875 1.3 12.4613 0.874803 13.0087 0.524403C13.5562 0.174003 14.22 -0.000797266 15 2.73348e-06C15.7813 2.73348e-06 16.4456 0.175203 16.9931 0.525603C17.5406 0.876002 17.8137 1.3008 17.8125 1.8V2.64C20.3125 3.04 22.3437 3.8852 23.9062 5.1756C25.4687 6.466 26.25 7.9408 26.25 9.6V18H28.125C28.6562 18 29.1019 18.1152 29.4619 18.3456C29.8219 18.576 30.0012 18.8608 30 19.2C30 19.54 29.82 19.8252 29.46 20.0556C29.1 20.286 28.655 20.4008 28.125 20.4H1.87501ZM15 24C13.9688 24 13.0856 23.7648 12.3506 23.2944C11.6156 22.824 11.2488 22.2592 11.25 21.6H18.75C18.75 22.26 18.3825 22.8252 17.6475 23.2956C16.9125 23.766 16.03 24.0008 15 24Z" fill="white" />
                                </svg>
                            </button>
                            <button type="button" className="inline-flex items-center text-gray-100  ml-4" onClick={() => setNav(!nav)}>
                                <span className="sr-only">Open menu</span>
                                <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 0C16.9891 0 18.8968 0.632141 20.3033 1.75736C21.7098 2.88258 22.5 4.4087 22.5 6C22.5 7.5913 21.7098 9.11742 20.3033 10.2426C18.8968 11.3679 16.9891 12 15 12C13.0109 12 11.1032 11.3679 9.6967 10.2426C8.29018 9.11742 7.5 7.5913 7.5 6C7.5 4.4087 8.29018 2.88258 9.6967 1.75736C11.1032 0.632141 13.0109 0 15 0ZM15 15C23.2875 15 30 17.685 30 21V24H0V21C0 17.685 6.7125 15 15 15Z" fill="white" />
                                </svg>
                            </button>
                            <button type="button" className="inline-flex items-center text-gray-100 ml-4" onClick={() => setNav(!nav)}>
                                <span className="sr-only">Open menu</span>
                                <svg width="30" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 22H32M2 12H32M2 2H32" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className={`absolute min-h-screen  top-0 pt-[60px] items-center justify-between  w-[100vw]  max-w-[250px] transition-all	z-20   ${nav ? 'left-0 ' : 'left-[-100vw]'}`} >
                <ul className="flex flex-col bg-transparent p-4 border-t-[2px] border-gray-100 mt-4 font-regular text-[14px]   ">

                    {userDB && userDB.rol && userDB.rol === 'Admin' && <li>
                        <Link href="/Admin" className="block py-2 pl-3 pr-4 text-gray-200 rounded   " onClick={() => setNav(false)}>Admin</Link>
                    </li>}
                    <li>
                        <Link href="/" className="block py-2 pl-3 pr-4 text-gray-200 rounded   " onClick={() => setNav(false)}>Remesas</Link>
                    </li>
                    <li>
                        <Link href="/Cambios" className="block py-2 pl-3 pr-4 text-gray-200 rounded   " onClick={() => setNav(false)}>Cambios</Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 pl-3 pr-4 text-gray-200 rounded   " onClick={() => setNav(false)}>Nosotros</Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500" onClick={() => setNav(false)}>Servicios</Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500" onClick={() => setNav(false)}>Politicas</Link>
                    </li>
                    <li>
                        <Link href="/Tracking" className="block py-2 pl-3 pr-4 text-gray-200 rounded   " onClick={() => setNav(false)}>Tracking</Link>
                    </li>
                    {user !== null && user !== undefined
                        ? <li>
                            <button className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500" onClick={signOutHandler}>Cerrar sesión</button>

                        </li>
                        : <li>
                            <Link href="/Login" className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500" onClick={() => setNav(false)}>Iniciar Sesión</Link>
                        </li>
                    }

                </ul>
            </div>
        </>
    )
}


