'use client';
import { useUser } from '@/context/Context'
import { useEffect, useState, useRef } from 'react'

export default function Home() {

    const { user, userDB, setUserProfile, modal, setModal, users, setUsers, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, item, setItem, exchange, setExchange, } = useUser()
    const [filter, setFilter] = useState('')
    const refFirst = useRef(null);

    function onChangeFilter(e) {
        setFilter(e.target.value)
    }
    function sortArray(x, y) {
        if (x['currency'].toLowerCase() < y['currency'].toLowerCase()) { return -1 }
        if (x['currency'].toLowerCase() > y['currency'].toLowerCase()) { return 1 }
        return 0
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
        <div className={` ${notificaciones === true ? 'bg-white absolute top-[70px] h-[400px] w-full sm:w-[500px] p-5 z-40 sm-right-[10px]' : 'h-[0px] w-full sm:w-[500px]'}`}>
            {enviosDB && enviosDB !== undefined && cambiosDB && cambiosDB !== undefined ? <ul> {Object.values({ ...enviosDB, ...cambiosDB }).filter((i) => i.notificacion !== undefined && i.notificacion === true).sort((a, b) => a.date - b.date).map((i, index) => {
                return <li className='pb-4 border-b-[1px] border-gray-300' onClick={handlerNotificaciones}>Tu {i.operacion} de dinero {i.estado === 'En verificacion' && 'esta en verificación'}{i.estado === 'Transfiriendo' && 'ya se esta transfiriendo'}{i.estado === 'Exitoso' && 'ha sido exitoso'} {i.estado === 'Rechazado' && 'ha sido rechazado'}</li>
            })
            }</ul>
                : <ul>
                    <li className='pb-4 border-b-[1px] border-gray-300'>Sin notificaciones</li>
                </ul>}
        </div>
    )
}




















