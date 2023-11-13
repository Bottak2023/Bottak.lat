'use client';
import { useUser } from '@/context/Context'
import { getSpecificData, writeUserData } from '@/firebase/database'
import { useEffect, useState, useRef  } from 'react'
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
  function manage(i) {
    setItem(i)
    setModal('Disable')
  }
  function save(i) {
    setItem(i)
    setModal('Save')
  }
  function disableConfirm() {
    function callback() {
      getSpecificData('currencies', setCountries, () => { setModal('') })
    }

    setModal('Guardando...')
    writeUserData(`currencies/${item.cca3}`, { habilitado: item.habilitado === undefined || item.habilitado === false ? true : false }, setUserSuccess, callback)
    return
  }
  async function saveConfirm() {
    function callback() {
      getSpecificData('currencies', setCountries, () => { setModal('') })
    }

    setModal('Guardando...')
    await writeUserData(`currencies/${item.cca3}`, state[item.cca3], setUserSuccess, callback)
    const obj = { ...state }
    delete obj[item.cca3]
    setState(obj)
    return
  }
  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
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
    <main className='h-full w-full'>
      {modal === 'Guardando...' && <Loader> {modal} </Loader>}
      {modal === 'Save' && <Modal funcion={saveConfirm}>Estas seguro de modificar la tasa de cambio de:  {item['currency']}</Modal>}
      {modal === 'Disable' && <Modal funcion={disableConfirm}>Estas seguro de {item.habilitado !== undefined && item.habilitado !== false ? 'DESABILITAR' : 'HABILITAR'} el siguiente item:  {item['currency']}</Modal>}
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
                Code
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
                  {i.code}/{i.currency}
                </td>
                <td className="px-3 py-4">
                  {i.habilitado !== undefined && i.habilitado !== false
                    ? <Button theme={"Success"} click={() => manage(i, 'Desabilitar')}>Habilitado</Button>
                    : <Button theme={"Danger"} click={() => manage(i, 'Habilitar')}>Desabilitado</Button>
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


