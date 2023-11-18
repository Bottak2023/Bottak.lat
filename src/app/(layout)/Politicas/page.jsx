'use client';
import { useEffect, useState, useRef } from 'react'
import TextEditor from '@/components/TextEditor'
import style from '@/components/ModatMSG.module.css'

export default function Home() {

    const [data, setData] = useState('')


    function handlerTextEditorOnChange(content, delta, source, editor) {


    }
    useEffect(() => {
        getSpecificData(`/politicas/`, setData)
    }, [])
    return (
        <div className={`h-full w-full flex flex-col justify-center items-center  p-4 overflow-x-hidden overflow-y-auto `}>
            <div className={`relative bg-white max-w-[1000px] w-full  rounded-lg shadow p-5 `}>
                <h3 className='text-center py-10'>Redactar Sección Nosotros</h3>
                <div className=" text-center">
                    <div className={style.editor}>
                        <TextEditor setValue={handlerTextEditorOnChange} value={data.content} edit={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}




















