'use client'
import { useUser } from '@/context/Context'
import { onAuth, signInWithEmail } from '@/firebase/utils'
import { getSpecificData } from '@/firebase/database'
import { useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/Button'
import Msg from '@/components/Msg'
import NavInit from '@/components/NavInit'
import Error from '@/components/Error'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

import style from '@/app/(layout)/style.module.css'

export default function Home({ children }) {

  const { user, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, transferencia, divisas, setDivisas, select, setSelect, select2, setSelect2, isSelect, setIsSelect, isSelect2, setIsSelect2, setIsSelect3 } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  function redirect(data) {
    router.push(data)
  }
  const mainClick = (e) => {
    setIsSelect(false)
    setIsSelect2(false)
    setIsSelect3(false)
  }

  useEffect(() => {
    if (user === undefined) onAuth(setUserProfile, setUserData)
    user && userDB === undefined && getSpecificData(`/users/${user.uid}`, setUserData)
    // divisas === undefined && getSpecificData('currencies', setDivisas)
  }, [user, userDB, divisas])

  return (
    <main className='  relative w-full  h-full' onClick={(e) => mainClick(e)}>
      <div className={`lg:grid lg:grid-cols-2 w-full lg:w-full lg:px-[5vw] flex flex-col min-h-full justify-between  pb-5`} style={{ gridTemplateColumns: '40% 60%' }}>
        <div className={`lg:flex flex-col justify-center items-center h-[300px] lg:h-auto hidden `}>
          <img src="/logo.svg" className={`h-[200px] w-[200px] ${style.logo}`} alt="User" />
          <h1 className='text-[#FFF500] text-[14px] font-light'>Cambios App</h1>
          <h3 className='text-white text-[14px] font-light'>Tus transferencias mas faciles y seguras</h3>
          <div className='py-12 hidden lg:block w-full'>
            {(pathname === '/' || pathname === '/Cambios') && (user === null || user === undefined)
              ? <div className='hidden lg:grid lg:grid-cols-2 w-full lg:gap-2 w-full '>
                <Button type="submit" theme={"Transparent"} click={() => redirect('/SignUp')}>Registrate</Button>
                <Button type="submit" theme={"Primary"} click={() => redirect('/Login')}>Iniciar Sesión</Button>
              </div>
              : <NavInit mobile={false} />}
            <br /><br />
            <p className='text-white underline text-[14px] font-light text-center'>Politicas De Servicio</p>
          </div>
        </div>
        <div className='relative   w-full   h-full'>
          {children}
        </div>
      </div>
    </main>
  )
}




// const signInHandler = async (e) => {
//   e.preventDefault()
//   let email = e.target[0].value
//   let password = e.target[1].value
//   if (email.length == 0 || password.length == 0) {
//     return setUserSuccess('Complete')
//   }
//   const res = await signInWithEmail(email, password, setUserProfile)
//   if (res == null) {
//     setUserSuccess('Error')
//     return
//   }
//   if (res && (userDB == null || userDB == undefined)) {
//     const data = await getSpecificData(`/users/${res.uid}`)
//     data == null ? router.push('/Register') : router.push('/Register/Destinatario')
//   }
// }