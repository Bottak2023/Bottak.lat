'use client'
import { useUser } from '@/context/Context'
import { onAuth } from '@/firebase/utils'
import Image from 'next/image'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import NavInit from '@/components/NavInit'
import { getSpecificData, } from '@/firebase/database'
import style from '@/app/(layout)/style.module.css'
import SelectCambio from '@/components/SelectCambio'
import { useState, useEffect } from "react";
import { WithAuth } from '@/HOCs/WithAuth'
import { useRouter, usePathname } from 'next/navigation';

export default function Home() {
    const { user, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, state, setState, modal, setModal } = useUser()
    const pathname = usePathname()
    const router = useRouter()

    // const signInHandler = (e) => {
    //   e.preventDefault()
    //   let email = e.target[0].value
    //   let password = e.target[1].value
    //   email.length !== 0 && password.length !== 0 ? signInWithEmailAndPassword(email, password, setUserSuccess) : setUserSuccess('Complete')
    // }
    // useEffect(() => {
    //   user === undefined && onAuth(setUserProfile)
    //   if (user !== undefined && user !== null) router.replace('/Cliente')
    // }, [user]);


    function handlerMode(e, data) {
        setState(data)
        router.push(data)
        console.log('click')
    }
    // console.log(pathname.toString().includes('Ca'))

    function handlerTransfer(e) {
        e.preventDefault()
        console.log('click')
        if (user == null && user == undefined) {
          setModal('registrate')
          return
        }
        
        if (user && userDB == null) {
          router.push('/Register')
          return
        }
    
        if (user && userDB) {
          router.push('/Register/Destinatario')
          return
        }
        // setNav(!nav)
        // user !== null && user !== undefined
        //   ? console.log('si usuario')
        //   : setModal('Registrate o inicia sesión para completar tu transferencia')
        // return   console.log(modal)
    
      }




    useEffect(() => {
        if (user === undefined) onAuth(setUserProfile)
        user && userDB === undefined && getSpecificData(`/users/${user.uid}`, setUserData)
    }, [user, userDB])


    return (
        <>
        <NavInit mobile={true} />
        <div className={`flex flex-col justify-center items-center h-[300px] lg:h-auto lg:hidden `}>
          <img src="/logo.svg" className={`h-[200px] w-[200px] ${style.logo}`} alt="User" />
          <h1 className='text-[#FFF500] text-[14px] font-light'>Cambios App</h1>
          <h3 className='text-white text-[14px] font-light'>Tus transferencias mas faciles y seguras</h3>
          <br />
          <div className='hidden lg:grid lg:grid-cols-2 lg:grid-gap-2 w-full '>
            <Button type="submit" theme={"Transparent"}>Registrate</Button>
            <Button type="submit" theme={"Primary"}>Iniciar Sesión</Button>
          </div>
        </div>
                <div className='lg:h-full lg:py-20 w-full flex flex-col justify-between items-center h-[350px]'>
                    <NavInit mobile={false} />
                  
                    <h3 className='text-[greenyellow] text-[14px] font-light'>Solo disponible para Bolivia</h3>
                    
                    <div className="relative flex justify-between  w-[100%] max-w-[350px] py-1 ">
                        <span className="bg-transparent w-1/2 py-1 border-[1px] border-gray-200 text-gray-200 text-center">6.90</span>
                        <button className='absolute left-0 right-0 top-0 bottom-0 m-auto bg-[yellow] rounded-full w-[50px] h-[50px]'></button>
                        <span className="bg-gray-200 w-1/2 py-1 border-[1px] border-gray-200 text-center">1</span>
                    </div>
                    <SelectCambio />
                    <span className='text-[#FFF500] text-[14px] font-light'>Cambiar a:</span>
                    <SelectCambio />
                    <Button theme='Primary' click={handlerTransfer}>   Cambiar   </Button >
                </div>
                </>
    )
}



{/* <dir>
                <Button theme='Secondary'>   Iniciar Sesión   </Button >
                <Button theme='secondary'>   registrate   </Button >
            </dir> */}






{/* <p className='text-white underline'>Politicas De Servicio</p> */ }
{/*   {success == 'AccountNonExist' && <Error>Cuenta inexistente</Error>}
      {success == 'Complete' && <Error>Complete el formulario</Error>} */}

{     /*{success == false && <Error>ERROR: verifique e intente nuevamente</Error>}
        {success == 'complete' && <Error>Llene todo el formulario</Error>} */}
   //   <div className="">
    //     <div className='grid grid-cols-2 gap-[15px]'><span className='text-white'>Tasa de cambio aplicado</span><span className='text-white'>1$ = 697 BOB</span></div>
    //     <div className='grid grid-cols-2 gap-[15px]'><span className='text-white'>Comisiones</span><span className='text-white'>5 $</span></div>
    //     <div className='grid grid-cols-2 gap-[15px]'><span className='text-white'>Pagas</span><span className='text-white'>0 $</span></div>
    //   </div>
    //   <br />