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
  const { nav, setNav, user, userDB, setUserProfile, select, setSelect, select2, setSelect2, isSelect, setIsSelect, isSelect2, setIsSelect2, state, setState, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, modal, setModal, setTransferencia, transferencia, divisas, setDivisas } = useUser()
  const pathname = usePathname()
  const router = useRouter()

  // const signInHandler = (e) => {
  //   e.preventDefault()
  //   let email = e.target[0].value
  //   let password = e.target[1].value
  //   email.length !== 0 && password.length !== 0 ? signInWithEmailAndPassword(email, password, setUserSuccess) : setUserSuccess('Complete')
  // }
  // useEffect(() => {
  //   user === undefined && onAuth(setUserProfile, setUserData)
  //   if (user !== undefined && user !== null) router.replace('/Cliente')
  // }, [user]);


  // console.log(pathname.toString().includes('Ca'))

  // function handlerTransfer(e) {
  //     e.preventDefault()
  //     console.log('click')
  //     if (user == null && user == undefined) {
  //       setModal('registrate')
  //       return
  //     }

  //     if (user && userDB == null) {
  //       router.push('/Register')
  //       return
  //     }

  //     if (user && userDB) {
  //       router.push('/Register/Destinatario')
  //       return
  //     }
  //     // setNav(!nav)
  //     // user !== null && user !== undefined
  //     //   ? console.log('si usuario')
  //     //   : setModal('Registrate o inicia sesión para completar tu transferencia')
  //     // return   console.log(modal)

  //   }

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

  async function handlerTransfer(e) {
    e.preventDefault()
    e.stopPropagation()

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
    user && userDB
      ? router.push('/ConfirmCambio?operacion=Cambio')
      : router.push('/Register/Destinatario?operacion=Cambio')
  }
  useEffect(() => {
    if (user === undefined) onAuth(setUserProfile, setUserData)
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
      <form className='lg:h-full lg:py-[30px]  w-full h-[370px] flex flex-col justify-between items-center  ' onSubmit={handlerTransfer}>
        <NavInit mobile={false} />

        <h3 className='text-[greenyellow] text-[14px] font-light'>Solo disponible para Bolivia</h3>

        <div className="relative flex justify-between  w-[100%] sm:max-w-[350px] py-1 ">
          <span className="bg-transparent w-1/2 py-1 border-[1px] border-gray-200 text-gray-200 text-center">{divisas && divisas !== undefined && divisas[select] && divisas[select] !== undefined && select && select !== undefined && (divisas[select].venta / divisas[select].venta).toFixed(2)} {select}</span>
          <button className='absolute left-0 right-0 top-0 bottom-0 m-auto bg-[yellow] rounded-full w-[50px] h-[50px]'></button>
          <span className="bg-gray-200 w-1/2 py-1 border-[1px] border-gray-200 text-center">{divisas && divisas !== undefined && divisas[select2] && divisas[select2] !== undefined && select2 && select2 !== undefined && (divisas[select2].venta / divisas[select].venta).toFixed(2)} {select2}</span>
        </div>
        <SelectCambio onChange="Transference" placeholder='Monto a cambiar' propHandlerSelect={handlerSelect} propSelect={select} propHandlerIsSelect={handlerIsSelect} propIsSelect={isSelect} defaultValue={transferencia} />
        <span className='text-[#FFF500] text-[14px] font-light'>Cambiar a:</span>
        <SelectCambio value={true} propHandlerSelect={handlerSelect2} propSelect={select2} propHandlerIsSelect={handlerIsSelect2} propIsSelect={isSelect2} />
        <Button theme='Primary' click={handlerTransfer}> Cambiar </Button >
        <div className="">
          <div className='grid grid-cols-2 gap-[15px]'>
            <span className='text-white text-[14px] font-light'>Tasa de cambio </span>
            <span className='text-white text-[14px] font-light'>{divisas && divisas !== undefined && divisas[select2] && divisas[select2] !== undefined && select2 && select2 !== undefined && (divisas[select2].venta / divisas[select2].venta).toFixed(2)} {select2} = {divisas && divisas !== undefined && divisas[select] && divisas[select] !== undefined && select && select !== undefined && (divisas[select].venta / divisas[select2].venta).toFixed(2)} {select}</span>
          </div>
          <div className='grid grid-cols-2 gap-[15px]'>
            <span className='text-white text-[14px] font-light'>Comisiones</span>
            <span className='text-white text-[14px] font-light'>
              {(divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USD'].compra / divisas[select].venta).toFixed(2)) <= 1000 && divisas[select]['tarifa 1'] + ' ' + select}
              {(divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USD'].compra / divisas[select].venta).toFixed(2)) <= 10000 && (divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USD'].compra / divisas[select].venta).toFixed(2)) > 1000 && divisas[select]['tarifa 2'] + ' ' + select}
              {(divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USD'].compra / divisas[select].venta).toFixed(2)) <= 100000 && (divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USD'].compra / divisas[select].venta).toFixed(2)) > 10000 && divisas[select]['tarifa 3'] + ' ' + select}
              {(divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USD'].compra / divisas[select].venta).toFixed(2)) > 100000 && 'CONTACTESE CON SOPORTE'}
            </span>
          </div>
          {/* <br />
            <p className='text-white underline text-[14px] font-light text-center lg:hidden'>Politicas De Servicio</p>
          */}
        </div>
      </form>
    </>
  )
}




// // const res = await fetch('http://localhost:3000/api')
// const res = await fetch('/api', {
//   method: 'POST',
//   body: JSON.stringify({
//     type: 'Cambio de Divisa',
//     amount: transferencia,
//     comision: 0
//   }),
//   headers: new Headers({
//     'Content-Type': 'application/json; charset=UTF-8'
//   })
// })
// const data = await res.json()
// console.log(data)

// console.log(data.url)
// window.open(data.url, "_self")
// return
// console.log('click')
// if (user == null && user == undefined) {
//   console.log('signup')
//   setModal('registrate')
//   return
// }

// if (user && userDB == null) {
//   console.log('registrate')


//   router.push('/Register')
//   return
// }

// if (user && userDB) {

//   console.log('Destinatario')
//   router.push('/Register/Destinatario')
//   return
// }








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