'use client';
import { useUser } from '@/context/Context'
import { getSpecificData, writeUserData } from '@/firebase/database'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Tag from '@/components/Tag'
import Loader from '@/components/Loader'
import Modal from '@/components/Modal'
import Select from '@/components/Select'
import { estado as estadoCONST } from '@/constants/'

export default function Home() {

  const { user, userDB, setUserProfile, modal, setModal, users, setUsers, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, item, setItem, exchange, setExchange, destinatario, setDestinatario } = useUser()
  const [filter, setFilter] = useState('')
  const [state, setState] = useState({})
  const [remesasDB, setRemesasDB] = useState(undefined)
  const [estado, setEstado] = useState('')
  const refFirst = useRef(null);

  function onChangeFilter(e) {
    setFilter(e.target.value)
  }
  function sortArray(x, y) {
    if (x['translation']['spa']['common'].toLowerCase() < y['translation']['spa']['common'].toLowerCase()) { return -1 }
    if (x['translation']['spa']['common'].toLowerCase() > y['translation']['spa']['common'].toLowerCase()) { return 1 }
    return 0
  }
  function handlerSelect(name, i, uuid) {
    setState({ ...state, [uuid]: { [name]: i } })
  }
  function save(uuid) {
    setModal('Guardando...')
    writeUserData(`envios/${uuid}`, state[uuid], setUserSuccess, () => { setModal('') })
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
  useEffect(() => {
    remesasDB === undefined && getSpecificData(`/cambios/`, setRemesasDB)
  }, [remesasDB])
  return (
    <main className='w-full h-full'>
      {modal === 'Guardando...' && <Loader> {modal} </Loader>}
      {modal === 'Save' && <Modal funcion={saveConfirm}>Estas seguro de modificar la tasa de cambio de:  {item['currency']}</Modal>}
      {modal === 'Disable' && <Modal funcion={disableConfirm}>Estas seguro de {item.habilitado !== undefined && item.habilitado !== false ? 'DESABILITAR' : 'HABILITAR'} el siguiente item:  {item['currency']}</Modal>}
      <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
      <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>
      <div className="w-full   relative h-full overflow-auto shadow-2xl p-5 bg-white min-h-[80vh] scroll-smooth" ref={refFirst}>
        <h3 className='font-medium text-[14px]'>Remesas</h3>
        <br />
        <input type="text" className='border-b-[1px] text-[14px] outline-none w-[400px]' onChange={onChangeFilter} placeholder='Buscar por remitente, destinatario o DNI' />
        <div className='min-w-[1900px] flex justify-start items-center my-5 '>
          <h3 className="flex pr-12 text-[14px]" htmlFor="">Estado</h3>
          <div className="grid grid-cols-4 gap-4 w-[700px] ">
            {estadoCONST.map((i, index) => {
              return <Tag theme={estado == i ? 'Primary' : 'Secondary'} click={() => setEstado(estado == i ? '' : i)}>{i}</Tag>
            })}
          </div>
        </div>
        <br />
        <br />
        <table className="w-full min-w-[2500px] border-[1px] bg-white text-[14px] text-left text-gray-500 border-t-4 border-t-gray-400">
          <thead className="text-[14px] text-gray-700 uppercase bg-white">
            <tr>
              <th scope="col" className="w-[50px] px-3 py-3">
                #
              </th>
              <th scope="col" className=" px-3 py-3">
                estado
              </th>
              <th scope="col" className=" px-3 py-3">
                Usuario
              </th>
              <th scope="col" className=" px-3 py-3">
                DNI de usuario
              </th>
              <th scope="col" className=" px-3 py-3">
                Pais de usuario
              </th>
              <th scope="col" className=" px-3 py-3">
                Whatsapp de usuario
              </th>
              <th scope="col" className=" px-3 py-3">
                Cuenta de usuario
              </th>
              <th scope="col" className=" px-3 py-3">
                Nombre de banco
              </th>
              <th scope="col" className=" px-3 py-3">
                Divisa de envio
              </th>
              <th scope="col" className=" px-3 py-3">
                Importe
              </th>
              <th scope="col" className=" px-3 py-3">
                Divisa de cambio
              </th>
              <th scope="col" className=" px-3 py-3">
                Importe con el <br /> cambio aplicado
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
            {remesasDB && remesasDB !== undefined && Object.values(remesasDB).sort(sortArray).map((i, index) => {
              return ((i.destinatario !== undefined && i.destinatario.toLowerCase().includes(filter.toLowerCase())) ||
                (i.remitente !== undefined && i.remitente.toLowerCase().includes(filter.toLowerCase())) ||
                (i.dni !== undefined && i.dni.toLowerCase().includes(filter.toLowerCase())) ||
                (i['dni remitente'] !== undefined && i['dni remitente'].toLowerCase().includes(filter.toLowerCase()))) &&
                (i.estado !== undefined && i.estado.toLowerCase().includes(estado.toLowerCase())) && i.operacion === 'Cambio' &&
                <tr className={`text-[14px] border-b hover:bg-gray-100  ${index % 2 === 0 ? '' : ''} `} key={index}>
                  <td className="px-3 py-4  flex  ">
                    <span className='h-full flex py-2'>{index + 1}</span>
                  </td>
                  {/* {console.log(i['estado'])} */}
                  <td className="min-w-32 px-3 py-4  ">
                    <Select arr={['En verficación', 'Transfiriendo', 'Exitoso', 'Rechazado']} name='estado' uuid={i.uuid} defaul={i.estado} click={handlerSelect} />
                  </td>
                  <td className="min-w-32 px-3 py-4  ">
                    {i['usuario']}
                  </td>
                  <td className="min-w-32 px-3 py-4  ">
                    {i['dni']}
                  </td>
                  <td className="min-w-32 px-3 py-4  ">
                    {i['pais']}
                  </td>
                  <td className="min-w-32 px-3 py-4  ">
                    {i['whatsapp']}
                  </td>
                  <td className="min-w-32 p-3">
                    {i['cuenta bancaria']}
                  </td>
                  <td className="min-w-32 p-3">
                    {i['banco']}
                  </td>
                  <td className=" p-3">
                    {i['divisa de usuario']}
                  </td>
                  <td className="px-3 py-4  ">
                    {i['importe']}
                  </td>
                  <td className=" p-3">
                    {i['divisa de cambio']}
                  </td>
                  <td className="min-w-32 p-3">
                    {i['cambio']}
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
