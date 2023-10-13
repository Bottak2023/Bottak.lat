'use client';
import { useUser } from '@/context/Context'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import style from './Select.module.css'


export default function isSelect3({ arr, name, click }) {
    const { isSelect3, setIsSelect3 } = useUser()
    const router = useRouter()

    const [state, setState] = useState(arr[0])

    function handlerSelect(e) {
        e.stopPropagation()
        setIsSelect3(!isSelect3)
    }

    function handlerUserState(name, i) {
        setState(i)
        click(name, i)
    }

    return (
        <div className={`relative w-[100%] max-w-[350px] bg-transparent border border-gray-300 text-gray-900 text-sm rounded-xl block w-full p-0 `} >
            <div
                className={`relative bg-gray-50 border border-gray-300 text-gray-900 text-[14px] rounded-xl block w-full p-3 `}
                onClick={handlerSelect}>
                {state} <span className={isSelect3 ? 'absolute right-5 rotate-[270deg]' : 'absolute right-5 rotate-90'}>{'>'}</span>
            </div>
            <ul
                className={isSelect3 ? `py-3  absolute left-0 top-[38px] h-[100px] overflow-y-auto bg-gray-50 outline outline-1 outline-gray-300 text-gray-900 text-[14px] rounded-b-xl focus:ring-blue-500 focus:outline-blue-500 w-full  z-30` : 'hidden'}            // className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            >
                {
                    arr.map((i, index) => <li key={i} className={`py-2 px-3 ${index % 2 === 0 ? 'bg-gray-200' : ''}`} onClick={() => handlerUserState(name, i)}>{i}</li>)
                }
            </ul>
        </div>

    )
}















