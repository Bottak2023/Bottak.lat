'use client';
import { useUser } from '@/context/Context'
import { useEffect, useState } from 'react'

export default function Home() {

    const { user, userDB, setUserProfile, modal, setModal, users, setUsers, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, item, setItem, exchange, setExchange, } = useUser()
    const [filter, setFilter] = useState('')

    function onChangeFilter(e) {
        setFilter(e.target.value)
    }
    function sortArray(x, y) {
        if (x['translation']['spa']['common'].toLowerCase() < y['translation']['spa']['common'].toLowerCase()) { return -1 }
        if (x['translation']['spa']['common'].toLowerCase() > y['translation']['spa']['common'].toLowerCase()) { return 1 }
        return 0
    }
    
    return (
        <main className='h-full'>
            <div className="relative left-0 h-full overflow-x-auto shadow-md p-5 lg:p-10 bg-white min-h-[80vh]">
                <h3 className='font-medium text-[14px]'>Lista De Cambios</h3>
                <br />
                <input type="text" className='border-b-[1px] text-[14px] outline-none w-[400px]' onChange={onChangeFilter} placeholder='Buscar Divisa' />
                <br />
                <br />
                <table className="w-full overflow-visible min-w-[1500px]  text-[14px] text-left text-gray-500 border-t-4 border-gray-400" style={{ minWidth: '1500px' }}>
                    <thead className="text-[14px] text-gray-700 uppercase bg-white">
                        <tr>
                            <th scope="col" className=" px-3 py-3">
                                #
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Divisa
                            </th>
                            <th scope="col" className=" px-3 py-3">
                                Code
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                                Compra
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                                Venta
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                                Tarifa de Envio<br />
                                1 - 1000 USD
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                                Tarifa de Envio <br />
                                10 000 - 100 000 USD
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                                Tarifa de Envio<br />
                                100 000 - ... USD
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {divisas && divisas !== undefined && Object.values(divisas).map((i, index) => {
                            return i.currency !== undefined && i.habilitado !== undefined && i.habilitado === true && i.currency.toLowerCase().includes(filter.toLowerCase()) && <tr className={`text-[14px] border-b hover:bg-gray-100  ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-100'} `} key={index}>
                                <td className="px-3 py-4  flex text-gray-900 ">
                                    <span className='h-full flex py-2'>{index + 1}</span>
                                </td>
                                <td className="px-3 py-4 text-gray-900 ">
                                    {i['translation']['spa']['common']}
                                </td>
                                <td className="px-3 py-4 text-gray-900 ">
                                    {i.code}/{i.currency}
                                </td>
                                <td className="w-32 p-4">
                                    {i['compra'] !== undefined ? i['compra'] : '-----'}
                                </td>
                                <td className="w-32 p-4">
                                    {i['venta'] !== undefined ? i['venta'] : '-----'}
                                </td>
                                <td className="w-32 p-4">
                                    {i['tarifa 1'] !== undefined ? i['tarifa 1'] : '-----'}
                                </td>
                                <td className="w-32 p-4">
                                    {i['tarifa 2'] !== undefined ? i['tarifa 2'] : '-----'}
                                </td>
                                <td className="w-32 p-4">
                                    {i['tarifa 3'] !== undefined ? i['tarifa 3'] : '-----'}
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




















