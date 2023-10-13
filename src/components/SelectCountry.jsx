'use client'
// import CurrencyFlag from 'react-currency-flags';
// import CurrencyList from 'currency-list';
import React, { useState, useEffect } from "react";
import { useUser } from '@/context/Context'
import { writeUserData, getSpecificData } from "@/firebase/database"
import divisasJSON from '@/utils/divisas'

export default function App({ placeholder, value, onChange, propHandlerSelect, propSelect, propIsSelect, propHandlerIsSelect }) {
    const { userDB, currency, setCurrency, setUserSuccess, select, setSelect, select2, setSelect2, transferencia, setTransferencia, success, setuserSuccess, divisas, setDivisas, isSelect, setIsSelect, isSelect2, setIsSelect2, } = useUser()

    function handlerUserSelect(e, i) {
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


  const fetchdata = async (e) => {
        const res = await fetch('https://restcountries.com/v3.1/all')
        const db = await res.json()

        console.log(db)
        const data = db.reduce((acc, i) => {
            const obj = {
                cambioUSD: 0,
                cambio: false,
                cca2: i.cca2,
                cca3: i.cca3,
                ccn3: i.ccn3 ? i.ccn3 : 'non exist',
                cioc: i.cioc !== undefined ? i.cioc : i.status,
                remesas: false,
                code: i.currencies && Object.keys(i.currencies)[0] !== null && Object.keys(i.currencies)[0] !== undefined ? Object.keys(i.currencies)[0] : i.cca3,
                symbol: i.currencies && i.currencies[Object.keys(i.currencies)[0]].symbol ? i.currencies[Object.keys(i.currencies)[0]].symbol : 'non exist',
                currency: i.currencies && i.currencies[Object.keys(i.currencies)[0]].name ? i.currencies[Object.keys(i.currencies)[0]].name : 'non exist',
                flagSVG: i.flags.svg,
                flagPNG: i.flags.png,
                translation: i.translations 
            }
            console.log(obj)
            return { ...acc, [obj.cca3]: obj }
        }, {})

        return writeUserData('currencies', data, setUserSuccess)
    }


    useEffect(() => {
        // fetchdata()
        // writeUserData('divisas', divisasJSON, setUserSuccess)
        // setCurrency(CurrencyList.getAll('es_US'))
        Object.keys(divisas).length <= 0 && getSpecificData('currencies', setDivisas)
    }, []);

    return (
        <div className={`relative w-[100%] max-w-[350px] bg-transparent border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-0 `} >
            <div className='relative w-full bg-transparent flex justify-between items-center'>
                <span className=" w-[15%] text-gray-100 p-3 " onClick={(e) => handlerIsSelect(e)}>{divisas && divisas[propSelect] && divisas[propSelect].translation.spa.common }</span>
                <span className='w-[auto] flex items.center rounded-[20px] '><img src={divisas && divisas[propSelect] && divisas[propSelect].flagSVG} className="h-[35px]" alt="" /></span>
                <span className={propIsSelect ? 'text-white text-center w-[10%] right-5 rotate-[270deg] p-3 ' : 'text-white text-center w-[10%] right-5 rotate-90 p-3 '} onClick={(e) => handlerIsSelect(e)}>{'>'}</span>
            </div>
            <ul className={`absolute left-0 top-10 bg-gray-100 flex flex-col justify-center items-center  text-gray-900 text-sm rounded-b-xl focus:ring-blue-500 focus:outline-blue-500 w-full   z-30 overflow-y-scroll transition-all ${propIsSelect ? 'h-[150px] outline outline-1 outline-gray-300' : 'h-0 overflow-y-hidden'}`} >
                {Object.values(divisas).map((i, index) => i.habilitado !== undefined && i.habilitado !== false && i.habilitado !== null && <li className='w-[200px] h-[50px] flex justify-start items-center' key={index} onClick={(e) => handlerUserSelect(e, i)}>
                    <span className="inline-block w-[30px]"><img src={i.flagSVG} className="h-[35px]" alt="" /></span>
                    <span className="pl-5"> {i.code}, {i.name}</span>
                </li>)}
            </ul>
        </div>
    );
}             

// --------------------------------IMPORTANTE-----------------------


    // const fetchdata = async (e) => {
    //     const res = await fetch('https://restcountries.com/v3.1/all')
    //     const db = await res.json()

    //     console.log(db)
    //     const data = db.reduce((acc, i) => {
    //         const obj = {
    //             cambioUSD: 0,
    //             cambio: false,
    //             cca2: i.cca2,
    //             cca3: i.cca3,
    //             ccn3: i.ccn3,
    //             cioc: i.cioc !== undefined ? i.cioc : i.status,
    //             remesas: false,
    //             code: i.currencies && Object.keys(i.currencies)[0] !== null && Object.keys(i.currencies)[0] !== undefined ? Object.keys(i.currencies)[0] : i.cca3,
    //             symbol: i.currencies && i.currencies[Object.keys(i.currencies)[0]].symbol ? i.currencies[Object.keys(i.currencies)[0]].symbol : 'non exist',
    //             currency: i.currencies && i.currencies[Object.keys(i.currencies)[0]].name ? i.currencies[Object.keys(i.currencies)[0]].name : 'non exist',
    //             flagSVG: i.flags.svg,
    //             flagPNG: i.flags.png,
    //             translation: i.transalations ? i.transalations : 'non exist',
    //         }
    //         console.log(obj)
    //         return { ...acc, [obj.code !== null && obj.code !== undefined ? obj.code : obj.ccn3]: obj }
    //     }, {})

    //     return writeUserData('currencies', data, setUserSuccess)
    // }