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
import { useSearchParams } from 'next/navigation'
const InvoicePDF = dynamic(() => import("@/components/pdf"), {
    ssr: false,
});


function Home() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const pathname = searchParams.get('uuid')

    const { nav, setNav, user, userDB, setUserProfile, select, setSelect, select2, setSelect2, isSelect, setIsSelect, isSelect2, setIsSelect2, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, modal, setModal, setTransferencia, transferencia, divisas, setDivisas, fecha, setFecha, qr, setQr, QRurl, setQRurl, transactionDB, setTransactionDB } = useUser()

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

    console.log(transactionDB)
    console.log(pathname)

    useEffect(() => {
        document.getElementById('qr') && setQRurl(document.getElementById('qr').toDataURL())
        const date = getDayMonthYear()
        // userDB === undefined && getSpecificData(`/users/${user.uuid}`, setUserData)
        transactionDB === undefined && getSpecificData(`/envios/${pathname}`, setTransactionDB)

    }, [user, userDB, qr, QRurl])


    return (
        transactionDB && transactionDB !== undefined && <main>
            <Confeti />
            <div className='lg:grid lg:grid-cols-2 lg:gap-5'>
                <div className='relative left-0 right-0 mx-0 sm:max-h-[80vh] overflow-y-auto rounded-[20px]'>
                    <table className=" w-[300px] lg:w-full lg:min-w-auto text-[14px] text-left text-gray-500 rounded-[20px]">
                        <thead className="text-[14px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col-3" className="w-1/2 px-3 py-3">
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    Datos
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white text-[14px] border-b hover:bg-gray-50 " >
                                <td className="px-3 py-3 flex flex-col text-[14px] text-gray-700 ">
                                    Remitente
                                </td>
                                <td className="px-3 py-3 text-gray-900 ">
                                    {transactionDB.remitente && transactionDB.remitente}
                                </td>
                            </tr>
                            <tr className="bg-white text-[14px] border-b hover:bg-gray-50 " >
                                <td className="px-3 py-3 flex flex-col text-[14px] text-gray-700 ">
                                    DNI remitente
                                </td>
                                <td className="px-3 py-3 text-gray-900 ">
                                    {transactionDB['dni remitente'] && transactionDB['dni remitente']}
                                </td>
                            </tr>
                            <tr className="bg-white text-[14px] border-b hover:bg-gray-50 " >
                                <td className="px-3 py-3 flex flex-col text-[14px] text-gray-700 ">
                                    Pais remitente
                                </td>
                                <td className="px-3 py-3 text-gray-900 ">
                                    {transactionDB['pais remitente'] && transactionDB['pais remitente']}
                                </td>
                            </tr>
                            <tr className="bg-white text-[14px] border-b hover:bg-gray-50 " >
                                <td className="px-3 py-3 flex flex-col text-[14px] text-gray-700 ">
                                    Destinatario
                                </td>
                                <td className="px-3 py-3 text-gray-900 ">
                                    {transactionDB.destinatario && transactionDB.destinatario}
                                </td>
                            </tr>
                            <tr className="bg-white text-[14px] border-b hover:bg-gray-50 " >
                                <td className="px-3 py-3 flex flex-col text-[14px] text-gray-700 ">
                                    Celular de destinatario
                                </td>
                                <td className="px-3 py-3 text-gray-900 ">
                                    {transactionDB.celular && transactionDB.celular}
                                </td>
                            </tr>
                            <tr className="bg-white text-[14px] border-b hover:bg-gray-50 " >
                                <td className="px-3 py-3 text-gray-900 ">
                                    Cuenta de destinatario:
                                </td>
                                <td className="px-3 py-3 text-gray-900 ">
                                    {transactionDB['cuenta destinatario'] && transactionDB['cuenta destinatario']}
                                </td>
                            </tr>
                            <tr className="bg-white text-[14px] border-b hover:bg-gray-50 " >
                                <td className="px-3 py-3 text-gray-900 ">
                                    Divisa de envio:
                                </td>
                                <td className="px-3 py-3 text-gray-900 ">
                                    {transactionDB['divisa de envio'] && transactionDB['divisa de envio']}
                                </td>
                            </tr>
                            <tr className="bg-white text-[14px] border-b hover:bg-gray-50 " >
                                <td className="px-3 py-3 text-gray-900 ">
                                    Importe:
                                </td>
                                <td className="px-3 py-3 text-gray-900 ">
                                    {transactionDB.importe && transactionDB.importe}
                                </td>
                            </tr>
                            <tr className="bg-white text-[14px] border-b hover:bg-gray-50 " >
                                <td className="px-3 py-3 text-gray-900 ">
                                    Divisa de receptor:
                                </td>
                                <td className="px-3 py-3 text-gray-900 ">
                                    {transactionDB['divisa de receptor'] && transactionDB['divisa de receptor']}
                                </td>
                            </tr>
                            <tr className="bg-white text-[14px] border-b hover:bg-gray-50 " >
                                <td className="px-3 py-3 text-gray-900 ">
                                    Importe Con el cambio aplicado:
                                </td>
                                <td className="px-3 py-3 text-gray-900 ">
                                    {transactionDB.cambio && transactionDB.cambio}
                                </td>
                            </tr>
                            <tr className="bg-white text-[14px] border-b hover:bg-gray-50 " >
                                <td className="px-3 py-3 text-gray-900 ">
                                    Fecha:
                                </td>
                                <td className="px-3 py-3 text-gray-900 ">
                                    {transactionDB.fecha && transactionDB.fecha}
                                </td>
                            </tr>
                            <tr className="bg-white text-[14px] border-b hover:bg-gray-50 " >
                                <td className="px-3 py-3 text-gray-900 ">
                                    Estado:
                                </td>
                                <td className="px-3 py-3 text-gray-900 ">
                                    {transactionDB.estado && transactionDB.estado}
                                </td>
                            </tr>
                            <tr className="bg-white text-[14px] border-b hover:bg-gray-50 " >
                                <td className="px-3 py-3 text-gray-900 ">
                                    Operacion:
                                </td>
                                <td className="px-3 py-3 text-gray-900 ">
                                    {transactionDB.operacion && transactionDB.operacion}
                                </td>
                            </tr>
                            <tr className="bg-white text-[14px] border-b hover:bg-gray-50 " >
                                <td className="px-3 py-3 text-gray-900 ">
                                    ID de tracking:
                                </td>
                                <td className="px-3 py-3 text-gray-900 ">
                                    {transactionDB.uuid}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className='w-[150px] h-[150px]'>

                        {transactionDB.uuid && <QRCode
                            id='qr'
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%", border: 'none', backgroundColor: 'red' }}
                            value={transactionDB.uuid}
                            level={'H'}
                            includeMargin={true}
                            renderAs={'canvas'}
                            viewBox={`0 0 256 256`}
                            imageSettings={{
                                src: '/favicon.png',
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
