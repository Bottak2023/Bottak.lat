'use client';
import { useUser } from '@/context/Context'
import { getSpecificData, writeUserData } from '@/firebase/database'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import Modal from '@/components/Modal'

import { useRouter } from 'next/navigation';



export default function Home() {

    const { user, userDB, setUserProfile, modal, setModal, users, setUsers, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, item, setItem, exchange, setExchange, destinatario, setDestinatario } = useUser()
    const router = useRouter()
    const [filter, setFilter] = useState('')
    const [state, setState] = useState({})
    const [remesasDB, setRemesasDB] = useState(undefined)
    const refFirst = useRef(null);

    function onChangeFilter(e) {
        setFilter(e.target.value)
    }
    function sortArray(x, y) {
        if (x['translation']['spa']['common'].toLowerCase() < y['translation']['spa']['common'].toLowerCase()) { return -1 }
        if (x['translation']['spa']['common'].toLowerCase() > y['translation']['spa']['common'].toLowerCase()) { return 1 }
        return 0
    }
    function onChangeHandler(e, i) {
        setState({ ...state, [i.cca3]: { ...state[i.cca3], [e.target.name]: e.target.value } })
    }
    function save(i) {
        setDestinatario(i)
        router.push('/Confirm/')
    }
    function redirect() {
        router.push('/Register/Destinatario')
    }
    const prev = () => {
        requestAnimationFrame(() => {
            const scrollLeft = refFirst.current.scrollLeft;
            console.log(scrollLeft)
            const itemWidth = screen.width - 50
            refFirst.current.scrollLeft = scrollLeft - itemWidth;
        });
    };
    const next = () => {
        requestAnimationFrame(() => {
            const scrollLeft = refFirst.current.scrollLeft;
            console.log(scrollLeft)
            const itemWidth = screen.width - 50
            console.log(itemWidth)
            refFirst.current.scrollLeft = scrollLeft + itemWidth;
        });
    };


  

    return (
        <main className='w-full h-full'>
            {modal === 'Guardando...' && <Loader> {modal} </Loader>}
            {modal === 'Save' && <Modal funcion={saveConfirm}>Estas seguro de modificar la tasa de cambio de:  {item['currency']}</Modal>}
            {modal === 'Disable' && <Modal funcion={disableConfirm}>Estas seguro de {item.habilitado !== undefined && item.habilitado !== false ? 'DESABILITAR' : 'HABILITAR'} el siguiente item:  {item['currency']}</Modal>}
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>
            <div className="w-full   relative h-full overflow-auto shadow-2xl p-5 bg-white min-h-[80vh] scroll-smooth" ref={refFirst}>                
            <h3 className='font-medium text-[14px]'>Transacciones</h3>
                <br />
                <input type="text" className='border-b-[1px] text-[14px] outline-none w-[400px]' onChange={onChangeFilter} placeholder='Buscar Destinatario' />
                <br />
                <br />
                <table className="w-full min-w-[2000px] border-[1px] bg-white text-[14px] text-left text-gray-500 border-t-4 border-t-gray-400">
                    <thead className="text-[14px] text-gray-700 uppercase bg-white">
                        <tr>
                            <th scope="col" className="w-[50px] px-3 py-3">
                                #
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Estado
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Destinatario
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                DNI
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Dirección
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Celular
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Nro de cuenta
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Banco
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Importe
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Divisa <br/> de <br/> envio
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Importe con el <br/> cambio aplicado
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Divisa <br/> de <br/> receptor
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                ID de transaccion
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Fecha
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userDB && userDB !== undefined && userDB.historial && userDB.historial !== undefined && Object.values(userDB.historial).map((i, index) => {
                            return i.destinatario.toLowerCase().includes(filter.toLowerCase()) && <tr className={`text-[14px] border-b hover:bg-gray-100  ${index % 2 === 0 ? '' : ''} `} key={index}>
                                <td className="px-3 py-4  flex  ">
                                    <span className='h-full flex py-2'>{index + 1}</span>
                                </td>
                                <td className="min-w-32 px-3 py-4  ">
                                    <span className={`inline-block py-5 px-10 ${i['estado'] == 'exitoso' && 'bg-green-500'} i['estado'] == 'en proceso' && 'bg-gray-100'}`}>{i['estado']}</span>
                                </td>
                                <td className="min-w-32 px-3 py-4  ">
                                    {i['destinatario']}
                                </td>
                                <td className="min-w-32 p-3">
                                      {i['dni']}   
                                </td>
                                <td className="min-w-32 p-3">
                                     {i['direccion']}
                                </td>
                                <td className="min-w-32 p-3">
                                      {i['celular']}
                                </td>
                                <td className="min-w-32 p-3">
                                      {i['cuenta destinatario']}
                                </td>
                                <td className="min-w-32 p-3">
                                     {i['nombre de banco']}
                                </td>
                                <td className="px-3 py-4  ">
                                    {i['importe']}
                                </td>
                                <td className=" p-3">
                                      {i['divisa de envio']}
                                </td>
                                <td className="min-w-32 p-3">
                                     {i['cambio']}
                                </td>
                                <td className=" p-3">
                                      {i['divisa de receptor']}
                                </td>
                                <td className="min-w-32 p-3">
                                      {i['uuid']}
                                </td>
                                <td className="min-w-32 p-3">
                                     {i['fecha']}
                                </td>
                                
                            </tr>
                        })
                        }
                    </tbody>
                </table>
            </div>
        </main>
    )
}



















