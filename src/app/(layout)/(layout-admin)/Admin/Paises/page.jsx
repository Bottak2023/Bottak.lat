'use client';
import { useUser } from '@/context/Context'
import { getSpecificData, writeUserData } from '@/firebase/database'
import { uploadStorage } from '@/firebase/storage'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
// import { getCurrencyExchange } from '@/currency';
import Modal from '@/components/Modal'

import { useRouter } from 'next/navigation';



export default function Home() {

  const { user, userDB, setUserProfile, modal, setModal, users, setUsers, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, setCountries, item, setItem, exchange, setExchange, countries } = useUser()
  const router = useRouter()
  const [filter, setFilter] = useState('')
  const [state, setState] = useState({})
  const [temporal, setTemporal] = useState(undefined)
  const [postImage, setPostImage] = useState({})
  const [urlPostImage, setUrlPostImage] = useState({})
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
  function manage(i, data, operacion) {
    setItem(i)
    setModal(operacion)
  }
  function save(i) {
    setItem(i)
    setModal('Save')
  }
  function disableConfirm(operacion) {
    function callback() {
      getSpecificData('divisas', setCountries, () => { setModal('') })
    }
    setModal('Guardando...')
    writeUserData(`divisas/${item.cca3}`, { [operacion]: item[operacion] === undefined || item[operacion] === false ? true : false }, setUserSuccess, callback)
  }
  async function saveConfirm() {
    function callback() {
      getSpecificData('divisas', setCountries, () => { setModal('') })
    }

    setModal('Guardando...')
    postImage[item.cca3] 
    ? await uploadStorage(`divisas/${item.cca3}`, postImage[item.cca3], state[item.cca3], callback)
    : await writeUserData(`divisas/${item.cca3}`, state[item.cca3], setUserSuccess, callback)
    const obj = { ...state }
    delete obj[item.cca3]
    setState(obj)
    return
  }
  function manageInputIMG(e, name) {
    const file = e.target.files[0]
    setPostImage({ ...postImage, [name]: file })
    setUrlPostImage({ ...urlPostImage, [name]: URL.createObjectURL(file) })
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

  console.log(postImage)

  return (
    <main className='h-full w-full'>
      {modal === 'Guardando...' && <Loader> {modal} </Loader>}
      {modal === 'Save' && <Modal funcion={saveConfirm}>Estas seguro de modificar los datos de:  {item['currency']}</Modal>}
      {modal === 'recepcion' && <Modal funcion={() => disableConfirm('recepcion')}>Estas seguro de {item.recepcion !== undefined && item.recepcion !== false ? 'DESABILITAR' : 'HABILITAR'} la RECEPCIÓN para el siguiente pais:  {item['currency']}</Modal>}
      {modal === 'envio' && <Modal funcion={() => disableConfirm('envio')}>Estas seguro de {item.envio !== undefined && item.envio !== false ? 'DESABILITAR' : 'HABILITAR'} el ENVIO para el siguiente pais:   {item['currency']}</Modal>}
      <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
      <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>

      <div className="w-full   relative h-full overflow-auto shadow-2xl p-5 bg-white min-h-[80vh] scroll-smooth" ref={refFirst}>
        <h3 className='font-medium text-[14px]'>Lista De Cambios</h3>
        <br />
        <input type="text" className='border-b-[1px] text-[14px] outline-none w-[400px]' onChange={onChangeFilter} placeholder='Buscar Divisa' />
        <br />
        <br />
        <table className="w-full overflow-visible min-w-[500px]  text-[14px] text-left text-gray-500 border-t-4 border-gray-400" >
          {/* <table className="relative w-full overflow-scroll max-w-[800px] h-[50px]  text-[14px] text-left text-gray-500 border-t-4 border-gray-400"> */}
          <thead className="text-[14px] text-gray-700 uppercase bg-white">
            <tr>
              <th scope="col" className=" px-3 py-3">
                #
              </th>
              <th scope="col" className=" px-3 py-3">
                Pais
              </th>
              <th scope="col" className=" px-3 py-3">
                Divisa <br/>
                Code
              </th>
              <th scope="col" className="text-center px-3 py-3">
                Cuenta de cobro
              </th>
              <th scope="col" className="text-center px-3 py-3">
                Banco de cobro
              </th>
              <th scope="col" className="text-center px-3 py-3">
                QR de cobro
              </th>
              <th scope="col" className="text-center px-3 py-3">
                Recepción
              </th>
              <th scope="col" className="text-center px-3 py-3">
                Envio
              </th>
              <th scope="col" className="text-center px-3 py-3">
                Guardar
              </th>
            </tr>
          </thead>
          <tbody>
            {countries && countries !== undefined && Object.values(countries).map((i, index) => {
              return i.currency !== undefined && i.currency.toLowerCase().includes(filter.toLowerCase()) && <tr className={`text-[14px] border-b hover:bg-gray-100  ${index % 2 === 0 ? '' : ''} `} key={index}>
                <td className="px-3 py-4  flex text-gray-900 ">
                  <span className='h-full flex py-2'>{index + 1}</span>
                </td>
                <td className="px-3 py-4 text-gray-900 ">
                  {i['translation']['spa']['common']}
                </td>
                <td className="px-3 py-4 text-gray-900 ">
                {i.code}
                </td>
                <td className="px-3 py-4 text-gray-900 ">
                  <input type="text" name="cuenta de cobro" className='min-w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['cuenta de cobro'] !== undefined ? i['cuenta de cobro'] : 0} />
                </td>
                <td className="px-3 py-4 text-gray-900 ">
                  <input type="text" name="banco de cobro" className='min-w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i['banco de cobro'] !== undefined ? i['banco de cobro'] : 0} />
                </td>
                <td className="px-3 py-4 text-gray-900 ">
                  <label htmlFor={`img${index}`}>
                    <img src={urlPostImage[i.cca3] ? urlPostImage[i.cca3] : i.url} alt="Subir QR" />
                    <input id={`img${index}`} type="file" onChange={(e) => manageInputIMG(e, i.cca3)} className='hidden' accept='image/*' />
                  </label>
                </td>
                <td className="px-3 py-4">
                  {i.recepcion !== undefined && i.recepcion !== false
                    ? <Button theme={"Success"} click={() => manage(i, 'Desabilitar', 'recepcion')}>Habilitado</Button>
                    : <Button theme={"Danger"} click={() => manage(i, 'Habilitar', 'recepcion')}>Desabilitado</Button>
                  }
                </td>
                <td className="px-3 py-4">
                  {i.envio !== undefined && i.envio !== false
                    ? <Button theme={"Success"} click={() => manage(i, 'Desabilitar', 'envio')}>Habilitado</Button>
                    : <Button theme={"Danger"} click={() => manage(i, 'Habilitar', 'envio')}>Desabilitado</Button>
                  }
                </td>
                <td className="px-3 py-4">
                  {(state && state[i.cca3] !== undefined) || (postImage && postImage[i.cca3] !== undefined)
                    ? <Button theme={"Success"} click={() => save(i)}>Guardar</Button>
                    : <Button theme={"Disable"} >Disable</Button>
                  }
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


