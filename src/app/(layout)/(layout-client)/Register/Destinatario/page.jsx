'use client'


// import { writeUserData, readUserData, updateUserData } from '@/supabase/utils'
// import { uploadStorage } from '@/supabase/storage'
import { writeUserData } from '@/firebase/database'
import { useState } from 'react'
import { useUser } from '@/context/Context.js'
import Input from '@/components/Input'
import Select from '@/components/Select'
import Label from '@/components/Label'
import Checkbox from '@/components/Checkbox'
import { arrPaises } from '@/constants'

import Button from '@/components/Button'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
// import { WithAuth } from '@/HOCs/WithAuth'
import { WithAuth } from '@/HOCs/WithAuth'
<<<<<<< HEAD
import {generateUUID} from '@/utils/UUIDgenerator'
function Home() {
    const router = useRouter()

    // const { user, userDB, setUserData, setUserSuccess, setDestinatario, destinatario } = useUser()
    const { nav, setNav, user, userDB, setUserProfile, select, setDestinatario,  setSelect, select2, setSelect2, isSelect, setIsSelect, isSelect2, setIsSelect2,  setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, modal, setModal, setTransferencia, transferencia, divisas, setDivisas ,destinatario,  fecha, setFecha, qr, setQr, QRurl, setQRurl, } = useUser()
=======

function Home() {
    const router = useRouter()

    const { user, userDB, setUserData, setUserSuccess, setDestinatario, destinatario } = useUser()
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d

    const [postImage, setPostImage] = useState(null)
    const [urlPostImage, setUrlPostImage] = useState(null)

    const [account, setAccount] = useState('dependiente')





    const inputRefCard = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
    const inputRefDate = useMask({ mask: '__/__', replacement: { _: /\d/ } });
    const inputRefCVC = useMask({ mask: '___', replacement: { _: /\d/ } });
    const inputRefPhone = useMask({ mask: '+ 591 _ ___ ___', replacement: { _: /\d/ } });
    const inputRefWhatsApp = useMask({ mask: '+ 591 __ ___ ___', replacement: { _: /\d/ } });


    function manageInputIMG(e) {
        // const fileName = `${e.target.name}`
        const file = e.target.files[0]

        setPostImage(file)
        setUrlPostImage(URL.createObjectURL(file))

    }


    function onChangeHandler(e) {
        setDestinatario({ ...destinatario, [e.target.name]: e.target.value })
    }
    // function onChangeHandlerCheck(e) {
    //     setDestinatario({ ...destinatario, [e.target.name]: e.target.checked })
    // }
    function onClickHandler(name, value) {
        setDestinatario({ ...destinatario, [name]: value })
    }

    console.log(destinatario)
    function save(e) {
        e.preventDefault()
<<<<<<< HEAD
        const uuid = generateUUID()
        writeUserData(`users/${user.uid}/destinatarios/${destinatario['cuenta destinario']}`, {...destinatario, [uuid]: uuid}, setUserSuccess,)
=======
        writeUserData(`users/${user.uid}/destinatarios/${destinatario['tarjeta']}`, destinatario, setUserSuccess,)
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
        router.push('/Transferencias/Exitoso')
        // e.preventDefault()
        // writeUserData('Clinica', { ...state, uuid: user.uuid }, user.uuid, userDB, setUserData, setUserSuccess, 'Se ha guardado correctamente', 'Perfil')
        // uploadStorage('Clinica', postImage, user.uuid, updateUserData)
        // router.push('/Clinica/Perfil')
<<<<<<< HEAD
        setDestinatario({ ...destinatario, uuid })
        writeUserData(`envios/${uuid}`, {
            ...destinatario, 
           remitente:  userDB && userDB.profile && userDB.profile.nombre,
           ['divisa de envio']: select,
           importe: transferencia,
           ['divisa de receptor']: select2,
           cambio: divisas && divisas[select] && divisas[select2] ? (transferencia * divisas[select2].cambio / divisas[select].cambio).toFixed(2): '',
           fecha,
           estado: 'en proceso',
           operacion: 'envio',
           uuid
        }, setUserSuccess,)
    }
    return (
        <form className='w-full space-y-6 lg:grid lg:grid-cols-2 lg:gap-5' onSubmit={save}>
=======
    }
    return (
        <form className='w-full space-y-6 lg:grid lg:grid-cols-2 lg:gap-5'>
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
            <div className='w-full border-b-[2px] border-gray-100 col-span-2'>
                <h3 className='text-center pb-3 text-white  text-right'>Destinatario</h3>
            </div>
                <div className='lg:hidden'>
                    <h3 className='text-center pb-3  text-green-400 lg:hidden'>Informacion de tarjeta</h3>
                </div>
                <div className=' space-y-5'>
<<<<<<< HEAD
                    <Label htmlFor="">Número de Cuenta</Label>
                    <Input type="text" name="cuenta destinatario" onChange={onChangeHandler} reference={inputRefCard} require />
=======
                    <Label htmlFor="">Número de tarjeta</Label>
                    <Input type="text" name="tarjeta" onChange={onChangeHandler} reference={inputRefCard} require />
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
                </div>

                <div className='lg:hidden'>
                    <h3 className='text-center pb-3  text-green-400 lg:hidden'>Informacion personal</h3>
                </div>
                <div className=' space-y-5'>
                    <Label htmlFor="">Nombre</Label>
<<<<<<< HEAD
                    <Input type="text" name="destinatario" onChange={onChangeHandler} require />
=======
                    <Input type="text" name="nombre" onChange={onChangeHandler} require />
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
                </div>
         
       
                <div className=' space-y-5'>
                    <Label htmlFor="">DNI</Label>
                    <Input type="text" name="dni" onChange={onChangeHandler} require />
                </div>
                <div className=' space-y-5'>
                    <Label htmlFor="">Pais</Label>
                    <Select arr={arrPaises} name='pais' click={onClickHandler} />
                </div>
         
            <div className=' space-y-5'>
                    <Label htmlFor="">Dirección</Label>
                    <Input type="text" name="direccion" onChange={onChangeHandler} require />
                </div>
<<<<<<< HEAD
                <div className=' space-y-5'>
                    <Label htmlFor="">Numero de celular</Label>
                    <Input type="text" name="celular" onChange={onChangeHandler} require />
                </div>
            <div className='flex w-full justify-around items-end'>
                <Button theme='Primary' >Guardar</Button>
=======
            <div className='flex w-full justify-around items-end'>
                <Button theme='Primary' click={save}>Guardar</Button>
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
            </div>
        </form>
    )
}

export default WithAuth(Home)




{/* <div className='w-full flex justify-center'>
                <svg width="141" height="141" viewBox="0 0 141 141" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M70.5 112.8C55.8125 112.8 42.8288 105.28 35.25 94C35.4263 82.25 58.75 75.7875 70.5 75.7875C82.25 75.7875 105.574 82.25 105.75 94C101.866 99.7834 96.6194 104.523 90.4724 107.801C84.3254 111.08 77.4666 112.796 70.5 112.8ZM70.5 29.375C75.1744 29.375 79.6574 31.2319 82.9628 34.5372C86.2681 37.8426 88.125 42.3256 88.125 47C88.125 51.6744 86.2681 56.1574 82.9628 59.4628C79.6574 62.7681 75.1744 64.625 70.5 64.625C65.8256 64.625 61.3426 62.7681 58.0372 59.4628C54.7319 56.1574 52.875 51.6744 52.875 47C52.875 42.3256 54.7319 37.8426 58.0372 34.5372C61.3426 31.2319 65.8256 29.375 70.5 29.375ZM70.5 11.75C62.7848 11.75 55.1452 13.2696 48.0173 16.2221C40.8895 19.1745 34.4129 23.502 28.9575 28.9575C17.9397 39.9752 11.75 54.9185 11.75 70.5C11.75 86.0815 17.9397 101.025 28.9575 112.043C34.4129 117.498 40.8895 121.825 48.0173 124.778C55.1452 127.73 62.7848 129.25 70.5 129.25C86.0815 129.25 101.025 123.06 112.043 112.043C123.06 101.025 129.25 86.0815 129.25 70.5C129.25 38.0113 102.813 11.75 70.5 11.75Z" fill="#FFF500" />
                </svg>
            </div>
            <div>
                <h3 className='text-center pb-3 text-[yellow] text-[24px]'>hola, Pepe.</h3>
                <h3 className='text-center pb-3 text-green-400'>Completa los datos de tu tarjeta</h3>
            </div> */}