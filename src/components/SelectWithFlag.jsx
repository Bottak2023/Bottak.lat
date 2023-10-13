'use client'
// import CurrencyFlag from 'react-currency-flags';
// import CurrencyList from 'currency-list';
import React, { useState, useEffect } from "react";
import { useUser } from '@/context/Context'
<<<<<<< HEAD
import { writeUserData, getSpecificData } from "@/firebase/database"
import divisasJSON from '@/utils/divisas'

export default function App({ placeholder, value, onChange, propHandlerSelect, propSelect, propIsSelect, propHandlerIsSelect }) {
  const { userDB, currency, setCurrency, setUserSuccess, select,  setSelect, select2, setSelect2, transferencia, setTransferencia, success, setuserSuccess, divisas, setDivisas, isSelect, setIsSelect, isSelect2, setIsSelect2, } = useUser()
=======

export default function App({placeholder, value, onChange}) {

  const [isSelect, setIsSelect] = useState(false)
  const { currency, setCurrency, select, setSelect, transferencia, setTransferencia } = useUser()
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d




  function handlerUserSelect(e, i) {
    // e.nativeEvent.stopImmediatePropagation()
  // e.stopPropagation()

    console.log('child')
    propHandlerSelect(i.code)
  }
  function handlerIsSelect(e, i) {
  e.stopPropagation()

    console.log('child')
    propHandlerIsSelect()
    }
  

  const handlerOnChange = (e) => {
    console.log(e.target.value)
    onChange == 'Transference' && setTransferencia(e.target.value)
  }
<<<<<<< HEAD
  // console.log(Object.values(divisasJSON))
  useEffect(() => {
    // writeUserData('divisas', divisasJSON, setUserSuccess)
    // setCurrency(CurrencyList.getAll('es_US'))
    divisas === undefined && getSpecificData('divisas', setDivisas)
  }, [divisas, propSelect]);
  // console.log(select)
  // console.log(propSelect)

console.log(value && divisas && divisas[select] && divisas[select2] && (transferencia * divisas[select2].cambioUSD / divisas[select].cambioUSD).toFixed(2))
// console.log(divisas[select2].cambio)
console.log(divisas)
console.log(select2)

  return (
    <div className={`relative w-[100%] max-w-[350px] bg-transparent border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-0 `} >
      <div className='relative w-full bg-transparent flex justify-between items-center'>
        <input type="number" className='p-3 bg-transparent w-[65%] text-white text-center' step=".01" onChange={handlerOnChange} placeholder={placeholder} value={value && divisas && divisas[select] && divisas[select2] ? (transferencia * divisas[select2].cambio / divisas[select].cambio).toFixed(2) : null} required />

        <span className=" w-[15%] text-gray-100 p-3 " onClick={(e)=>handlerIsSelect(e)}>{propSelect}</span>
        {/* <span className='w-[auto] flex items.center rounded-[20px] '><CurrencyFlag currency={propSelect} size="xl" /></span> */}
        <span className={propIsSelect ? 'text-white text-center w-[10%] right-5 rotate-[270deg] p-3 ' : 'text-white text-center w-[10%] right-5 rotate-90 p-3 '} onClick={(e)=>handlerIsSelect(e)}>{'>'}</span>

      </div>
      <ul className={`absolute left-0 top-10 bg-gray-100 flex flex-col justify-center items-center  text-gray-900 text-sm rounded-b-xl focus:ring-blue-500 focus:outline-blue-500 w-full   z-30 overflow-y-scroll transition-all ${propIsSelect ? 'h-[150px] outline outline-1 outline-gray-300' : 'h-0 overflow-y-hidden'}`} >
          {divisas !== undefined && Object.values(divisas).map((i, index) => i.habilitado !== undefined && i.habilitado !== false && i.habilitado !== null && <li className='w-[200px] h-[50px] flex justify-start items-center' key={index} onClick={(e) => handlerUserSelect(e, i)}>
            {/* <span className="inline-block w-[30px]"><CurrencyFlag currency={i.code} size="lg" /></span> */}
            <span className="pl-5"> {i.code}, {i.name}</span>
          </li>)}
      </ul>
=======
  const handlerOnChange = (e) => {
    console.log(e.target.value)
    onChange == 'Transference' && setTransferencia(e.target.value)
  }

  useEffect(() => {
    // setCurrency(CurrencyList.getAll('es_US'))
  }, []);


  return (
    <div className={`relative w-[100%] max-w-[350px] bg-transparent border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-0 `} >
      <div className='relative w-full bg-transparent flex justify-between items-center'>
        <input type="number" className='p-3 bg-transparent w-[65%] text-white text-center' onChange={handlerOnChange} placeholder={placeholder} value={value ? (transferencia/6.97).toFixed(2) : null}/>
        
         <span className=" w-[15%] text-gray-100 p-3 " onClick={handlerSelect}>{select}</span>
        {/* <span className='w-[auto] flex items.center rounded-[20px] '><CurrencyFlag currency={select} size="xl" /></span> */}
        <span className={isSelect ? 'text-white text-center w-[10%] right-5 rotate-[270deg] p-3 ' : 'text-white text-center w-[10%] right-5 rotate-90 p-3 '} onClick={handlerSelect}>{'>'}</span> 

      </div>
      <ul className={`absolute left-0 top-10 bg-gray-50 flex flex-col justify-center items-center  text-gray-900 text-sm rounded-b-xl focus:ring-blue-500 focus:outline-blue-500 w-full   z-30 overflow-y-scroll transition-all ${isSelect ? 'h-[100px] outline outline-1 outline-gray-300' : 'h-0 overflow-y-hidden'}`} >
        <div className="">
          {/* { Object.keys(currency).map((i) => <li className='w-[100px] my-3 flex justify-between' key={i} onClick={() => handlerUserSelect(i)}> <span> {i}</span> <CurrencyFlag currency={i} size="sm" /></li>)} */}
        </div>
      </ul> 
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
    </div>
  );
}             