'use client';
import { useUser } from '@/context/Context'
import { getSpecificData, writeUserData } from '@/firebase/database'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Loader from '@/components/Loader'

import Modal from '@/components/Modal'
import { useRouter } from 'next/navigation';



export default function Home() {

  const {envios, user, userDB, setUserProfile, modal, setModal, users, setUsers, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, item, setItem, setEnvios} = useUser()
  const router = useRouter()
  const [filter, setFilter] = useState('')
  const [state, setState] = useState({})

  
  function onChangeFilter(e) {
    setFilter(e.target.value)
}

  function sortArray(x, y) {
    if (x['remitente'].toLowerCase() < y['remitente'].toLowerCase()) { return -1 }
    if (x['remitente'].toLowerCase() > y['remitente'].toLowerCase()) { return 1 }
    return 0
  }
  function onChangeHandler(e, i) {
    setState({ ...state, [i.code]: { ...i, cambio: e.target.value } })
  }
  function manage(i) {
    setItem(i)
    setModal('Disable')
  }
 function save(i) {
    setItem(i)
    setModal('Save')
  }
  function disableConfirm() {
    writeUserData(`divisas/${item.code}`, { habilitado: item.habilitado !== undefined ? !item.habilitado :false }, setUserSuccess)
    return setModal('')

  }
  async function saveConfirm() {
    setModal('Guardando...')
    await writeUserData(`divisas/${item.code}`, state[item.code], setUserSuccess)
    const obj = { ...state }
    delete obj[item.code]
    setState(obj)
    return setModal('')
  }
  console.log(envios)
  useEffect(() => {
    envios === undefined && getSpecificData('envios', setEnvios)
    // users === undefined && getSpecificData(`/users/`, setUsers)
  }, [user, envios]);


  return (
    <main className='h-full'>
      {modal === 'Guardando...' && <Loader> {modal} </Loader>}
      {modal === 'Save' && <Modal funcion={saveConfirm}>Estas seguro de modificar la tasa de cambio de:  {item['name']}</Modal>}
      {modal === 'Disable' && <Modal funcion={disableConfirm}>Estas seguro de {item['habilitado'] !== undefined && item['habilitado'] === false ? 'HABILITAR' : 'DESABILITAR'} el siguiente item:  {item['name']}</Modal>}

      <div className="relative left-0 h-full overflow-x-auto shadow-md p-5 lg:p-10 bg-white min-h-[80vh]">
        {/* <table className="w-[00px]  text-[12px] text-left text-gray-500 border-t-4 border-gray-400"> */}
        
        <h3 className='font-medium text-[14px]'>Lista De Transacciones</h3>
                <br />
                <input type="text" className='border-b-[1px] text-[12px] outline-none w-[400px]' onChange={onChangeFilter} placeholder='Buscar Remitente' />
                <br />
                <br />

        
        <table className="w-full overflow-visible min-w-[800px]  text-[12px] text-left text-gray-500 border-t-4 border-gray-400">

          {/* <table className="relative w-full overflow-scroll max-w-[800px] h-[50px]  text-[12px] text-left text-gray-500 border-t-4 border-gray-400"> */}
          <thead className="text-[12px] text-gray-700 uppercase bg-white">
            <tr>
              <th scope="col" className=" px-3 py-3">
                #
              </th>
              <th scope="col" className=" px-3 py-3">
                Remitente
              </th>
              <th scope="col" className=" px-3 py-3">
                Divisa de envio
              </th>
              <th scope="col" className=" px-3 py-3">
                Importe
              </th>
              <th scope="col" className=" px-3 py-3">
                Cambio
              </th>
              <th scope="col" className=" px-3 py-3">
                Receptor
              </th>
              <th scope="col" className=" px-3 py-3">
                Divisa de receptor
              </th>
              <th scope="col" className="text-center px-3 py-3">
                DNI
              </th>
              <th scope="col" className=" px-3 py-3">
                Operacion
              </th>
              <th scope="col" className=" px-3 py-3">
                Tarjeta
              </th>
              <th scope="col" className="text-center px-3 py-3">
                País
              </th>
              <th scope="col" className="text-center px-3 py-3">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {envios && envios !== undefined && Object.values(envios).sort(sortArray).map((i, index) => {

              return i.remitente.toLowerCase().includes(filter.toLocaleLowerCase()) && <tr className={`text-[12px] border-b  ${index % 2 === 0 ? 'bg-yellow-300' : 'bg-gray-200'} `} key={index}>
                <td className="px-3 py-4  flex text-gray-900 dark:text-white">
                  <span className='h-full flex py-2'>{index + 1}</span>
                </td>
                <td className="px-3 py-4 text-gray-900 dark:text-white">
                  {i.remitente}
                </td>
                <td className="px-3 py-4 text-gray-900 dark:text-white">
                  {i['divisa de envio']}
                </td>
                <td className="px-3 py-4 text-gray-900 dark:text-white">
                  {i.importe}
                </td>
                <td className="px-3 py-4 text-gray-900 dark:text-white">
                  {i.cambio}
                </td>
                <td className="px-3 py-4 text-gray-900 dark:text-white">
                  {i.destinatario}
                </td>
                <td className="px-3 py-4 text-gray-900 dark:text-white">
                {i['divisa de receptor']}
                </td>
                <td className="px-3 py-4 text-gray-900 dark:text-white">
                  {i.dni}
                </td>
                <td className="px-3 py-4 text-gray-900 dark:text-white">
                  {i.operacion}
                </td>
                <td className="px-3 py-4 text-gray-900 dark:text-white">
                  {i['cuenta destinatario']}
                </td>
                <td className="px-3 py-4 text-gray-900 dark:text-white">
                  {i.pais}
                </td>
                <td className="px-3 py-4 text-gray-900 dark:text-white">
                {i.estado}
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
