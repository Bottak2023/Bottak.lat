'use client'
import { useState } from 'react'
import { useUser } from '@/context/Context'

export default function Navbar({ children }) {
    const { user, nav, setNav } = useUser()

    const signOutHandler = () => {
        setUserProfile(null)
        signOut()
    }

    return (
            <div className={`absolute min-h-screen  top-0 items-center justify-between  w-[250px]  md:flex md:w-auto  transition-all	z-50 ${nav ? 'left-0' : 'left-[-100vw]'}`} >
                <ul className="flex flex-col bg-transparent p-4 md:p-0 mt-4 lg:font-normal lg:text-[14px]  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
                    <li>
                        <Link href="#" className="block py-2 pl-3 pr-4 text-gray-200 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 " aria-current="page">Nosotros</Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Servicios</Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Politicas</Link>
                    </li>
                    {!user
                        ? <li>
                            <button href="/" className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" onClick={signOutHandler}>Cerrar sesión</button>
                        </li>
                        : <li>
                            <button href="/Login" className="block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0" onClick={signOutHandler}>Iniciar Sesión</button>
                        </li>
                    }
                </ul>
            </div>
    )
}


