

'use client'
// import CurrencyFlag from 'react-currency-flags';
// import CurrencyList from 'currency-list';
import React, { useState, useEffect } from "react";
import { useUser } from '@/context/Context'

export default function App({ placeholder, value, onChange, propHandlerSelect, propSelect, propIsSelect, propHandlerIsSelect, defaultValue }) {
  const { userDB, currency, setCurrency, setUserSuccess, select, setSelect, select2, setSelect2, transferencia, setTransferencia, success, setuserSuccess, divisas, setDivisas, isSelect, setIsSelect, isSelect2, setIsSelect2, } = useUser()

  // const [currency, setCurrency] = useState("BOB");
  // const [select, setSelect] = useState('BOB')
  // const [isSelect, setIsSelect] = useState(false)

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


  useEffect(() => {
    // setCurrency(CurrencyList.getAll('es_US'))
  }, []);

  return (
    <div className={`relative flex w-[100%] max-w-[350px]  focus:ring-blue-500 focus:border-blue-500 block w-full p-0 `} >
      <div className='relative bg-transparent flex justify-between items-center bg-transparent border border-gray-300 text-gray-900 text-[14px] rounded-xl'>
        <input type="number" className='p-3 bg-transparent w-[65%] text-white text-center' step=".01" onChange={handlerOnChange} placeholder={placeholder} value={value && divisas && divisas[select] && divisas[select2] && (transferencia * divisas[select2].venta / divisas[select].venta).toFixed(2)} defaultValue={defaultValue} required />
        <span className=" w-[15%] text-gray-100 p-3 " onClick={(e)=>handlerIsSelect(e)}>{propSelect}</span>
        {/* <span className='w-[auto] flex items.center rounded-[20px] '><CurrencyFlag currency={propSelect} size="xl" /></span> */}
        <span className={propIsSelect ? 'text-white text-center w-[10%] right-5 rotate-[270deg] p-3 ' : 'text-white text-center w-[10%] right-5 rotate-90 p-3 '} onClick={(e) => handlerIsSelect(e)}>{'>'}</span>
      
         <ul className={`absolute left-0 top-10 bg-gray-100 flex flex-col justify-center items-center  text-gray-900 text-[14px] rounded-b-xl focus:ring-blue-500 focus:outline-blue-500 w-full   z-30 overflow-y-scroll transition-all ${propIsSelect ? 'h-[150px] outline outline-1 outline-gray-300' : 'h-0 overflow-y-hidden'}`} >
        {divisas !== undefined && Object.values(divisas).map((i, index) => i.habilitado !== undefined && i.habilitado !== false && i.habilitado !== null && <li className='w-[200px] h-[50px] flex justify-start items-center' key={index} onClick={(e) => handlerUserSelect(e, i)}>
          {/* <span className="inline-block w-[30px]"><CurrencyFlag currency={i.code} size="lg" /></span> */}
          <span className="pl-5"> {i.code}, {i.currency}</span>
        </li>)}
      </ul>
      </div>

   

    
      <button className='absolute right-0 top-0 bottom-0 m-auto bg-[yellow] rounded-full w-[50px] h-[50px] font-bold'>{propSelect}</button>

    </div>
  );
}



