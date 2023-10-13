

'use client'
// import CurrencyFlag from 'react-currency-flags';
// import CurrencyList from 'currency-list';
import React, { useState, useEffect } from "react";

export default function App() {
  const [currency, setCurrency] = useState("BOB");
  const [select, setSelect] = useState('BOB')
  const [isSelect, setIsSelect] = useState(false)


  function handlerSelect() {
    setIsSelect(!isSelect)
  }

  function handlerUserSelect(i) {
    setSelect(i)
  }

  useEffect(() => {
    // setCurrency(CurrencyList.getAll('es_US'))
  }, []);

  return (
    <div className={`relative flex w-[100%] max-w-[350px]  focus:ring-blue-500 focus:border-blue-500 block w-full p-0 `} onClick={handlerSelect}>
      <div className='relative bg-transparent flex justify-between items-center bg-transparent border border-gray-300 text-gray-900 text-sm rounded-xl'>
        <input type="number" className='p-3 bg-transparent w-[65%] text-white text-center' />
        <span className=" w-[15%] text-gray-100 p-3 ">{select}</span>
        {/* <span className='w-[auto] flex items.center rounded-[20px] '><CurrencyFlag currency={'BOB'} size="xl" /></span> */}
        <span className={isSelect ? 'text-white text-center w-[10%] right-5 rotate-[270deg] p-3 ' : 'text-white text-center w-[10%] right-5 rotate-90 p-3 '}>{'>'}</span>
      </div>
      {/* <ul className={`absolute left-0 top-10 bg-gray-50 flex flex-col justify-center items-center  text-gray-900 text-sm rounded-b-xl focus:ring-blue-500 focus:outline-blue-500 w-full   z-30 overflow-y-scroll transition-all ${isSelect ? 'h-[100px] outline outline-1 outline-gray-300' : 'h-0 overflow-y-hidden'}`} >
        <div className="">
        </div>
      </ul> */}
      <button className='absolute right-0 top-0 bottom-0 m-auto bg-[yellow] rounded-full w-[50px] h-[50px]'></button>

    </div>
  );
}

          {/* { Object.keys(currency).map((i) => <li className='w-[100px] my-3 flex justify-between' key={i} onClick={() => handlerUserSelect(i)}> <span> {i}</span> <CurrencyFlag currency={'BOB'} size="sm" /></li>)} */}


