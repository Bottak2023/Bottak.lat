'use client'


import { writeUserData, getSpecificData } from '@/firebase/database'
// import { uploadStorage } from '@/supabase/storage'
import { useEffect, useState } from 'react'
import { useUser } from '@/context/Context.js'
import Input from '@/components/Input'
import Select from '@/components/Select'
import Label from '@/components/Label'
import Checkbox from '@/components/Checkbox'
import { getDayMonthYear } from '@/utils/date'
import { WithAuth } from '@/HOCs/WithAuth'

import Button from '@/components/Button'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
// import { WithAuth } from '@/HOCs/WithAuth'
import dynamic from 'next/dynamic'
import Confeti from '@/components/Confeti';
import QRCode from "qrcode.react";

const InvoicePDF = dynamic(() => import("@/components/pdf"), {
    ssr: false,
});

function Home() {
    const router = useRouter()


    const { nav, setNav, user, userDB, setUserProfile, select, setSelect, select2, setSelect2, isSelect, setIsSelect, isSelect2, setIsSelect2, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, modal, setModal, setTransferencia, transferencia, divisas, setDivisas, destinatario, fecha, setFecha, qr, setQr, QRurl, setQRurl, } = useUser()

    const [state, setState] = useState({})

    const [postImage, setPostImage] = useState(null)
    const [urlPostImage, setUrlPostImage] = useState(null)

    const [account, setAccount] = useState('dependiente')


    const handlerQRUrl = (e) => {
        const qr = e
        setQr(qr)

    };


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
        setState({ ...state, [e.target.name]: e.target.value })
    }
    function onChangeHandlerCheck(e) {
        setState({ ...state, [e.target.name]: e.target.checked })
    }
    function onClickHandler(name, value) {
        setState({ ...state, [name]: value })
    }
    console.log(user)
    console.log(userDB)

    function save(e) {
        e.preventDefault()
        router.push('/Register/Tarjeta')
        // e.preventDefault()
        // writeUserData('Clinica', { ...state, uuid: user.uuid }, user.uuid, userDB, setUserData, setUserSuccess, 'Se ha guardado correctamente', 'Perfil')
        // uploadStorage('Clinica', postImage, user.uuid, updateUserData)
        // router.push('/Clinica/Perfil')
    }

    useEffect(() => {
        document.getElementById('qr') && setQRurl(document.getElementById('qr').toDataURL())


        // const dataURL = user.uuid
        // handlerQRUrl(dataURL)



        const date = getDayMonthYear()
        console.log(date)
        setFecha(date)
        userDB === undefined && getSpecificData(`/users/${user.uid}`, setUserData)
    }, [user, userDB, qr, QRurl])


    return (
        <main>
            <Confeti />
            <div className='lg:grid lg:grid-cols-2 lg:gap-5'>
                <table className=" w-[300px] lg:w-full lg:min-w-auto text-[12px] text-left text-gray-500 rounded-[20px]">
                    <thead className="text-[12px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col-3" className="w-1/2 px-3 py-3">
                                Datos
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Valores
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                            <td className="px-3 py-4  flex flex-col text-[12px] text-gray-700 dark:text-white">
                                Remitente
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {userDB && userDB.profile && userDB.profile.nombre}
                            </td>
                        </tr>
                        <tr className="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                            <td className="px-3 py-4  flex flex-col text-[12px] text-gray-700 dark:text-white">
                                Destinatario
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">

                                {destinatario.destinatario && destinatario.destinatario}
                            </td>
                        </tr>
                        <tr className="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                            <td className="px-3 py-4  flex flex-col text-[12px] text-gray-700 dark:text-white">
                                Celular de destinatario
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {destinatario.celular && destinatario.celular}

                            </td>
                        </tr>
                        <tr className="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                Cuenta destinatario:
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">

                                {destinatario['cuenta destinatario'] && destinatario['cuenta destinatario']}

                            </td>
                        </tr>
                        <tr className="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >

                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">

                                Divisa de envio:
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {select}

                            </td>
                        </tr>
                        <tr className="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >

                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                Importe:
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {transferencia}
                            </td>
                        </tr>
                        <tr className="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >

                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">

                                Divisa de receptor:
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {select2}
                            </td>
                        </tr>
                        <tr className="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >

                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                Importe Con el cambio aplicado:
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {divisas && divisas[select] && divisas[select2] ? (transferencia * divisas[select2].cambio / divisas[select].cambio).toFixed(2) : ''}
                            </td>
                        </tr>
                        <tr className="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >

                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">

                                Fecha:
                            </td>

                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {fecha}
                            </td>
                        </tr>

                        <tr className="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >

                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                Estado:
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                En proceso
                            </td>
                        </tr>
                        <tr className="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >

                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                Operacion:
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                Envio
                            </td>
                        </tr>


                        <tr className="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >

                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                ID de tracking:
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {destinatario.uuid}
                            </td>
                        </tr>
                    </tbody>

                </table>



                <div className='flex flex-col justify-center items-center w-full'>
                    <div className='w-[150px] h-[150px]'>

                        {destinatario.uuid && <QRCode
                            id='qr'
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%", border: 'none', backgroundColor: 'red' }}
                            value={destinatario.uuid}
                            level={'H'}
                            includeMargin={true}
                            renderAs={'canvas'}
                            viewBox={`0 0 256 256`}
                            imageSettings={{
                                src: '/logo.png',
                                width: 100,
                                height: 100
                            }}

                        />}

                    </div>
                    <br /> <br />
                    {qr !== '' && <a
                        className="text-white bg-emerald-400 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-[14px] w-full mx-5 py-4 text-center z-50"
                        href={QRurl} download>Guardar ImagenQR</a>}
                </div>
                <div>
                    {qr !== '' && <InvoicePDF dbUrl={QRurl} />}
                </div>

            </div>
        </main >


    )
}

export default WithAuth(Home)
