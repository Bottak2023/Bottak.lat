'use client'
import { useUser } from '@/context/Context'
import { onAuth } from '@/firebase/utils'
import Image from 'next/image'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import NavInit from '@/components/NavInit'
import { getSpecificData, } from '@/firebase/database'
import style from '@/app/(layout)/style.module.css'
import SelectWithFlag from '@/components/SelectWithFlag'
import { useState, useEffect } from "react";
import { WithAuth } from '@/HOCs/WithAuth'
import { useRouter, usePathname } from 'next/navigation';

import ModalINFO from '@/components/ModalINFO'

function Page() {
  const { nav, setNav, user, userDB, setUserProfile, select, setSelect, select2, setSelect2, isSelect, setIsSelect, isSelect2, setIsSelect2, state, setState, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, modal, setModal, setTransferencia, transferencia, divisas, setDivisas } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const [modalInfo, setModalInfo] = useState(false)


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

  // console.log(divisas)
  function redirect(e) {
    if (user == null && user == undefined) {
      setModal('registrate')
      return
    }
    e.preventDefault()
    window.open('https://api.whatsapp.com/send?phone=+59177455743&text=Hola%20BOTTAK,%20necesito%20hacer%20una%20transacci%C3%B3n...', '_blank')
  }

  async function handlerTransfer(e) {
    e.preventDefault()
    e.stopPropagation()

    // const res = await fetch('http://localhost:3000/api')
    const res = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({ amount: 400 }),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    })
    const data = await res.json()
    console.log(data)

    console.log(data.url)
    window.open(data.url, "_self")
    return
    console.log('click')
    if (user == null && user == undefined) {
      console.log('signup')
      setModal('registrate')
      return
    }

    if (user && userDB == null) {
      console.log('registrate')


      router.push('/Register')
      return
    }

    if (user && userDB) {

      console.log('Destinatario')
      router.push('/Register/Destinatario')
      return
    }

  }



  const handlerRedirect = (rute) => {
    router.push(rute)
    setModal('')
  }




  const handlerSelect = (i) => {
    setSelect(i)

  }
  const handlerSelect2 = (i) => {
    setSelect2(i)
  }
  const handlerIsSelect = () => {
    setIsSelect(!isSelect)
    setIsSelect2(false)
  }
  const handlerIsSelect2 = () => {
    setIsSelect2(!isSelect2)
    setIsSelect(false)
  }

  // console.log(select2)
  // useEffect(() => {
  //   if (user === undefined) onAuth(setUserProfile)
  //   user && userDB === undefined && getSpecificData(`/users/${user.uid}`, setUserData)
  //   divisas === undefined && getSpecificData('currencies', setDivisas)

  // }, [user, userDB, divisas])
  console.log(user)
  console.log(userDB)

  return (
    <>
      {/* {modalINFO && <ModalInfo theme="Alert">
        Nuestro sistema bottak.lat esta en matenimiento, <br />
        de momento todas las transacciones lo estamos llevando a cabo de manera manual, <br />
        contactanos en soporte por favor.
      </ModalInfo>} */}
      {modal === 'registrate' && <ModalINFO theme={'Danger'} alert={false} button="Iniciar Sesión" funcion={() => handlerRedirect('/Login')} >Inicia Sesión para continuar con tu transacción</ModalINFO>}
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
      {modalInfo === false
        ? <form className='lg:h-full lg:py-20 w-full flex flex-col justify-between items-center h-[350px]' onSubmit={handlerTransfer}>
          <NavInit mobile={false} />
          <h3 className='text-[14px] text-[#FFF500]'>Envia tus Remesas facilmente</h3>
          <SelectWithFlag onChange="Transference" placeholder='Monto a transferir' propHandlerSelect={handlerSelect} propSelect={select} propHandlerIsSelect={handlerIsSelect} propIsSelect={isSelect} defaultValue={transferencia}/>
          <span className='text-[#FFF500] text-[14px] font-light'>Divisa de receptor:</span>
          <SelectWithFlag value={true} propHandlerSelect={handlerSelect2} propSelect={select2} propHandlerIsSelect={handlerIsSelect2} propIsSelect={isSelect2} />
          <Button theme='Primary'>Efectuar transferencia</Button >

          <div className="">
            <div className='grid grid-cols-2 gap-[15px]'>
              <span className='text-white text-[14px] font-light'>Tasa de cambio </span>
              <span className='text-white text-[14px] font-light'>{divisas && divisas !== undefined && divisas[select2] && divisas[select2] !== undefined && select2 && select2 !== undefined && (divisas[select2].venta / divisas[select2].venta).toFixed(2)} {select2} = {divisas && divisas !== undefined && divisas[select] && divisas[select] !== undefined  && select && select !== undefined && (divisas[select].venta / divisas[select2].venta).toFixed(2)} {select}</span>
            </div>
            <div className='grid grid-cols-2 gap-[15px]'>
              <span className='text-white text-[14px] font-light'>Comisiones</span>
              <span className='text-white text-[14px] font-light'>
                {(divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USD'].compra / divisas[select].venta).toFixed(2)) <= 1000 && divisas[select]['tarifa 1'] + ' $'} 
                {(divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USD'].compra / divisas[select].venta).toFixed(2)) <= 10000 && (divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USD'].compra / divisas[select].venta).toFixed(2)) > 1000 && divisas[select]['tarifa 2'] + ' $'} 
                {(divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USD'].compra / divisas[select].venta).toFixed(2)) <= 100000 && (divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USD'].compra / divisas[select].venta).toFixed(2)) > 10000 && divisas[select]['tarifa 3']  + ' $'} 
                {(divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USD'].compra / divisas[select].venta).toFixed(2)) > 100000 && 'CONTACTESE CON SOPORTE'} 
                </span>
            </div>
          </div>

        </form>
        : <div className='lg:h-full lg:py-20 w-full flex flex-col justify-around items-center h-[350px]'>
          <NavInit mobile={false} />
          <div id="alert-additional-content-5" className="p-4 lg:m-5 lg:mt-[30px] border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800" role="alert">
            <div className="flex items-center">
              <svg className="flex-shrink-0 w-12 h-12 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#030712" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" fill="#030712" />
              </svg>
              <span className="sr-only">Info</span>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">Servicio disponible mediante Atencion al Cliente unicamente</h3>
            </div>
            <br />
            <div className="mt-2 mb-4 text-[14px] text-gray-800">
              Estimado usuario, le comunicamos que estamos en mantenimiento, por lo cual para cualquier transaccion que desee relizar, COMUNIQUESE CON ATENCION AL CLIENTE, para efectuar el mismo, gracias por su comprensión.
            </div>
            <br />
            <div className="flex w-full justify-center">
              <button type="button" className="text-white hover:bg-gray-900 bg-gray-950 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center" onClick={redirect}>
                {/* <svg className="-ml-0.5 mr-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                  <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg> */}
                <span className="pr-5">Atención al cliente </span>
                <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_14_2)">
                    <path d="M0.640234 14.9363C0.639531 17.4765 1.30328 19.9569 2.56539 22.1432L0.519531 29.6129L8.16391 27.6086C10.2782 28.7596 12.6472 29.3627 15.0545 29.3629H15.0609C23.0079 29.3629 29.477 22.8961 29.4804 14.9476C29.482 11.096 27.9834 7.47423 25.2606 4.74939C22.5384 2.02478 18.9179 0.523486 15.0603 0.521729C7.11227 0.521729 0.643633 6.98814 0.640352 14.9363" fill="transparent" />
                    <path d="M0.125391 14.9316C0.12457 17.5632 0.812109 20.1323 2.11922 22.3969L0 30.1344L7.91848 28.0582C10.1003 29.2478 12.5568 29.875 15.0564 29.8759H15.0628C23.295 29.8759 29.9965 23.1765 30 14.9435C30.0014 10.9535 28.4489 7.20152 25.6289 4.37906C22.8086 1.55695 19.0586 0.00164063 15.0628 0C6.82922 0 0.128672 6.69844 0.125391 14.9316ZM4.84102 22.0069L4.54535 21.5375C3.30246 19.5613 2.64645 17.2775 2.64738 14.9325C2.65008 8.08934 8.2193 2.52188 15.0675 2.52188C18.3839 2.52328 21.5006 3.81609 23.8448 6.16172C26.1889 8.50758 27.4788 11.6259 27.478 14.9426C27.475 21.7857 21.9056 27.3539 15.0628 27.3539H15.0579C12.8298 27.3527 10.6446 26.7544 8.73891 25.6236L8.28539 25.3547L3.58641 26.5867L4.84102 22.0068V22.0069Z" fill="white" />
                    <path d="M11.3293 8.68921C11.0497 8.06777 10.7554 8.05523 10.4895 8.04433C10.2718 8.03495 10.0229 8.03566 9.77422 8.03566C9.52531 8.03566 9.1209 8.12929 8.77906 8.50253C8.43687 8.87613 7.47266 9.77894 7.47266 11.6151C7.47266 13.4515 8.81012 15.226 8.99656 15.4753C9.18324 15.7241 11.5786 19.6128 15.3721 21.1089C18.525 22.3521 19.1666 22.1048 19.8508 22.0425C20.5352 21.9804 22.0591 21.1399 22.37 20.2684C22.6811 19.397 22.6811 18.65 22.5879 18.4939C22.4946 18.3384 22.2457 18.245 21.8724 18.0585C21.4991 17.8718 19.6641 16.9689 19.3221 16.8443C18.9799 16.7198 18.7311 16.6577 18.4822 17.0314C18.2333 17.4046 17.5186 18.245 17.3007 18.4939C17.0831 18.7434 16.8652 18.7745 16.4921 18.5878C16.1186 18.4005 14.9166 18.0069 13.4906 16.7355C12.3811 15.7462 11.632 14.5246 11.4143 14.1509C11.1965 13.7777 11.3909 13.5755 11.5781 13.3895C11.7458 13.2223 11.9514 12.9537 12.1382 12.7358C12.3243 12.5178 12.3864 12.3623 12.5109 12.1134C12.6355 11.8643 12.5731 11.6463 12.48 11.4596C12.3864 11.273 11.6612 9.42714 11.3293 8.68921Z" fill="white" />
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_14_2" x1="1448.56" y1="2909.64" x2="1448.56" y2="0.521729" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1FAF38" />
                      <stop offset="1" stop-color="#60D669" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_14_2" x1="1500" y1="3013.44" x2="1500" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#F9F9F9" />
                      <stop offset="1" stop-color="white" />
                    </linearGradient>
                    <clipPath id="clip0_14_2">
                      <rect width="30" height="30.2344" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              {/* <button type="button" className="text-gray-800 bg-transparent border border-gray-700 hover:bg-gray-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-800 dark:text-gray-300 dark:hover:text-white" data-dismiss-target="#alert-additional-content-5" aria-label="Close">
                Atención al cliente
              </button> */}
            </div>
          </div>
        </div>
      }
    </>

  )
}

export default Page













