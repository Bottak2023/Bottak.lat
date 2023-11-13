'use client'

import { writeUserData, getSpecificData } from '@/firebase/database'
import { useEffect, useState } from 'react'
import { useUser } from '@/context/Context.js'
import { getDayMonthYear } from '@/utils/date'
import { WithAuth } from '@/HOCs/WithAuth'
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic'
import Confeti from '@/components/Confeti';
import QRCode from "qrcode.react";
import { useSearchParams } from 'next/navigation'
const InvoicePDF = dynamic(() => import("@/components/pdf"), {
    ssr: false,
});

function Home() {
    const { nav, setNav, user, userDB, QRurl, setQRurl, transactionDB, setTransactionDB } = useUser()
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = searchParams.get('uuid')

    useEffect(() => {
        transactionDB !== undefined && QRurl === null && document.getElementById('qr') && setQRurl(document.getElementById('qr').toDataURL())
        transactionDB === undefined && getSpecificData(`/envios/${pathname}`, setTransactionDB)
    }, [user, userDB,  QRurl, transactionDB])

    return (
        transactionDB && transactionDB !== undefined && <main className=''>
            <Confeti />
            <div className='left-0 right-0 mx-auto lg:grid lg:grid-cols-2 lg:gap-5'>
                <div className='relative  sm:max-h-[80vh] overflow-y-auto rounded-[20px]'>
                    <table className="w-full  lg:w-full lg:min-w-auto text-[14px] text-left text-gray-500 rounded-[20px]">
                        <thead className="text-[14px] text-gray-700 uppercase bg-gray-50  ">
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
                                <td className="px-2 py-2 flex flex-col text-[14px] text-gray-700 ">
                                    DNI destinatario
                                </td>
                                <td className="px-2 py-2  text-gray-900 ">
                                    {transactionDB.dni && transactionDB.dni}
                                </td>
                            </tr>
                            <tr className="bg-white text-[14px] border-b hover:bg-gray-50 " >
                                <td className="px-2 py-2 flex flex-col text-[14px] text-gray-700 ">
                                    Pais destinatario
                                </td>
                                <td className="px-2 py-2  text-gray-900 ">
                                    {transactionDB.pais && transactionDB.pais}
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
                <div className='flex flex-col justify-center items-center w-full '>
                    <div className='w-[150px] h-[150px] my-10'>
                        {transactionDB.uuid && <QRCode
                            id='qr'
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%", border: 'none', }}
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
                    {QRurl !== '' && <a
                        className="text-white bg-emerald-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-[14px] w-full sm:max-w-[250px] mx-5 py-3 text-center z-50"
                        href={QRurl} download>Decargar QR Baucher</a>}
                    <div className='w-full text-center py-5 z-50'>
                        {QRurl !== '' && <InvoicePDF dbUrl={QRurl} />}
                    </div>
                </div>

            </div>
        </main >
    )
}

export default WithAuth(Home)
