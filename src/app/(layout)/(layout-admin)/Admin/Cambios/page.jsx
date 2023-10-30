'use client';
import { useUser } from '@/context/Context'
import { getSpecificData, writeUserData } from '@/firebase/database'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
// import { getCurrencyExchange } from '@/currency';
import Modal from '@/components/Modal'

import { useRouter } from 'next/navigation';



export default function Home() {

  const { user, userDB, setUserProfile, modal, setModal, users, setUsers, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, item, setItem, exchange, setExchange, } = useUser()
  const router = useRouter()
  const [filter, setFilter] = useState('')
  const [state, setState] = useState({})

  function onChangeFilter(e) {
    setFilter(e.target.value)
}


  function sortArray(x, y) {
    if (x['name'].toLowerCase() < y['name'].toLowerCase()) { return -1 }
    if (x['name'].toLowerCase() > y['name'].toLowerCase()) { return 1 }
    return 0
  }
  function onChangeHandler(e, i) {
    setState({ ...state, [i.code]: { ...i, [e.target.name]: e.target.value } })
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
    writeUserData(`divisas/${item.code}`, { habilitado: item.habilitado === undefined || item.habilitado === false ? true :false }, setUserSuccess)
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
  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
}

const getCurrencyExchange = async (input, output) => {
  
  const arr = Object.values(divisas).filter(i=>i.habilitado !== undefined && i.habilitado === true).map(i=>i.code)

  // console.log(Object.values(divisas))
  const res = await fetch(window.location.href.includes('https') ? 'https://bottak.lat/api/getExchange' : 'http://localhost:3000/api/getExchange', {
    method: 'POST',
    body: JSON.stringify({divisas: arr}),
    headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
  })
   const data = await res.json()
   setExchange(data) 
}

console.log(exchange)



  // const getCurrentExchanges = async () => {

  //   console.log(Object.keys(divisas))

  //   // Object.keys(divisas).map(i=>{



  //   //   // getCurrencyExchange('USD', i)
  //   //   // console.log(i)
  //   // })
  //   }


  useEffect(() => {
    divisas !== undefined && getCurrencyExchange()
  }, [divisas]);

  return (
    <main className='h-full'>
      {modal === 'Guardando...' && <Loader> {modal} </Loader>}
      {modal === 'Save' && <Modal funcion={saveConfirm}>Estas seguro de modificar la tasa de cambio de:  {item['name']}</Modal>}
      {modal === 'Disable' && <Modal funcion={disableConfirm}>Estas seguro de {item.habilitado !== undefined && item.habilitado !== false ? 'DESABILITAR' : 'HABILITAR' } el siguiente item:  {item['name']}</Modal>}

      <div class="relative left-0 h-full overflow-x-auto shadow-md p-5 lg:p-10 bg-white min-h-[80vh]">      
        <h3 className='font-medium text-[16px]'>Lista De Cambios</h3>
                <br />
                <input type="text" className='border-b-[1px] text-[12px] outline-none w-[400px]' onChange={onChangeFilter} placeholder='Buscar Divisa' />
                <br />
                <br />
        <table class="w-full overflow-visible min-w-[1500px]  text-[12px] text-left text-gray-500 border-t-4 border-gray-400" style={{minWidth: '1500px'}}>
          {/* <table class="relative w-full overflow-scroll max-w-[800px] h-[50px]  text-[12px] text-left text-gray-500 border-t-4 border-gray-400"> */}
          <thead class="text-[12px] text-gray-700 uppercase bg-white">
            <tr>
              <th scope="col" class=" px-3 py-3">
                #
              </th>
              <th scope="col" class=" px-3 py-3">
                Divisa
              </th>
              <th scope="col" class=" px-3 py-3">
                Code
              </th>
              <th scope="col" class=" px-3 py-3">
                Tasa de <br /> cambio USD

              </th>

              <th scope="col" class="text-center px-3 py-3">
                Compra
              </th>
              <th scope="col" class="text-center px-3 py-3">
                Venta
              </th>
              
              <th scope="col" class="text-center px-3 py-3">
                Tarifa de Envio<br />
                1 - 1000 USD
              </th>
              <th scope="col" class="text-center px-3 py-3">
                Tarifa de Envio <br />
                10 000 - 100 000 USD
              </th>
              <th scope="col" class="text-center px-3 py-3">
                Tarifa de Envio<br />
                100 000 - ... USD
              </th>
              <th scope="col" class="text-center px-3 py-3">
                Guardar
              </th>
              <th scope="col" class="text-center px-3 py-3">
                Habilitar
              </th>
            </tr>
          </thead>
          <tbody>
            {divisas && divisas !== undefined && Object.values(divisas).map((i, index) => {

              return i.name !== undefined && i.name.toLowerCase().includes(filter.toLowerCase()) && <tr class={`text-[12px] border-b hover:bg-gray-100  ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-100'} `} key={index}>
                <td class="px-3 py-4  flex text-gray-900 dark:text-white">
                  <span className='h-full flex py-2'>{index + 1}</span>
                </td>
                <td class="px-3 py-4 text-gray-900 dark:text-white">
                  {i.name}
                </td>
                <td class="px-3 py-4 text-gray-900 dark:text-white">
                  {i.code}/{i.symbol}
                </td>
                <td class="w-[150px] px-3 py-4 text-gray-900 dark:text-white">
                  1 USD = { exchange && exchange !== undefined && exchange[i.code] !== undefined && exchange[i.code]} {exchange && exchange !== undefined && exchange[i.code] !== undefined && `${i.code}`}
                </td>
                <td class="w-32 p-4">
                  <input type="number" name="compra" className='w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i.cambio !== undefined ? i.cambio : 0} />
                </td>
                <td class="w-32 p-4">
                  <input type="number" name="venta" className='w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i.cambio !== undefined ? i.cambio : 0} />
                </td>
                <td class="w-32 p-4">
                  <input type="number" name="tarifa 1" className='w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i.cambio !== undefined ? i.cambio : 0} />
                </td>
                <td class="w-32 p-4">
                  <input type="number" name="tarifa 2" className='w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i.cambio !== undefined ? i.cambio : 0} />
                </td>
                <td class="w-32 p-4">
                  <input type="number" name="tarifa 3" className='w-[100px] text-center p-2 outline-blue-200 rounded-xl' onChange={(e) => onChangeHandler(e, i)} defaultValue={i.cambio !== undefined ? i.cambio : 0} />
                </td>
                <td class="px-3 py-4">
                  {state && state[i.code] !== undefined
                    ? <Button theme={"Success"} click={() => save(i)}>Guardar</Button>
                    : <Button theme={"Disable"} >Disable</Button>
                  }
                </td>
                <td class="px-3 py-4">
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




















