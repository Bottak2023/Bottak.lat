'use client'

import { writeUserData } from '@/firebase/database'
import { useUser } from '@/context/Context.js'
import Input from '@/components/Input'
import SelectCountry from '@/components/SelectCountry'
import Label from '@/components/Label'
import Button from '@/components/Button'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'
import { getDayMonthYear } from '@/utils/date'
import { generateUUID } from '@/utils/UUIDgenerator'
function Home() {

    const { nav, setNav, user, userDB, setUserProfile, select, setDestinatario, isSelect3, setIsSelect3, select3, setSelect3, setSelect, select2, setSelect2, isSelect, setIsSelect, isSelect2, setIsSelect2, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, modal, setModal, setTransferencia, transferencia, divisas, setDivisas, destinatario, qr, setQr, QRurl, setQRurl, } = useUser()
    const router = useRouter()

    function onChangeHandler(e) {
        setDestinatario({ ...destinatario, [e.target.name]: e.target.value })
    }
    const handlerCountrySelect = (i) => {
        setDestinatario({ ...destinatario, ['pais']: i })
    }
    const handlerIsSelect = () => {
        setIsSelect3(!isSelect3)
    }
    const redirectHandler = (route, data) => {
        setDestinatario(data)
        router.push(route)
    }
    function save(e) {
        e.preventDefault()
        e.stopPropagation()
        const uuid = generateUUID()
        const date = new Date().getTime()
        const destinatarioDB = {...destinatario, uuid}
        writeUserData(`users/${user.uid}/destinatarios/${uuid}`, { ...destinatario, uuid }, setUserSuccess, redirectHandler('/Confirm', destinatarioDB))
    }
    return (
        <form className='w-full space-y-6 lg:grid lg:grid-cols-2 lg:gap-5' onSubmit={save}>
            <div className='w-full border-b-[2px] border-gray-100 col-span-2'>
                <h3 className=' pb-3 text-white  text-right'>Destinatario</h3>
            </div>
            <div className='lg:hidden'>
                <h3 className='text-center pb-3  text-green-400 lg:hidden'>Informacion de Bancaria</h3>
            </div>
            <div className=' space-y-5'>
                <Label htmlFor="">Numero de cuenta bancaria</Label>
                <Input type="text" name="cuenta destinatario" onChange={onChangeHandler} required />
            </div>
            <div className=' space-y-5'>
                <Label htmlFor="">Nombre de Banco</Label>
                <Input type="text" name="nombre de banco" onChange={onChangeHandler} required />
            </div>
            <div className='lg:hidden'>
                <h3 className='text-center pb-3  text-green-400 lg:hidden'>Informacion personal</h3>
            </div>
            <div className=' space-y-5'>
                <Label htmlFor="">Nombre</Label>
                <Input type="text" name="destinatario" onChange={onChangeHandler} required />
            </div>
            <div className=' space-y-5'>
                <Label htmlFor="">DNI</Label>
                <Input type="text" name="dni" onChange={onChangeHandler} required />
            </div>
            <div className=' space-y-5'>
                <Label htmlFor="">Pais</Label>
                <SelectCountry name="pais" propHandlerIsSelect={handlerIsSelect} propIsSelect={isSelect3} click={handlerCountrySelect}/>
            </div>
            <div className=' space-y-5'>
                <Label htmlFor="">Dirección</Label>
                <Input type="text" name="direccion" onChange={onChangeHandler} required />
            </div>
            <div className=' space-y-5'>
                <Label htmlFor="">Numero de celular</Label>
                <Input type="text" name="celular" onChange={onChangeHandler} required />
            </div>
            <div className='flex w-full justify-around items-end'>
                <Button theme='Primary' >Guardar</Button>
            </div>
        </form>
    )
}

export default WithAuth(Home)



//----------------------IMPORTANT---------------------------
// async function handlerTransfer(e) {
//     e.preventDefault()
//     e.stopPropagation()
//     const body = {
//         currency: select,
//         amount: transferencia,
//         comision: ((divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USD'].compra / divisas[select].venta).toFixed(2)) <= 1000 && divisas[select]['tarifa 1']) ||
//             ((divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USD'].compra / divisas[select].venta).toFixed(2)) <= 10000 && (divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USD'].compra / divisas[select].venta).toFixed(2)) > 1000 && divisas[select]['tarifa 2']) ||
//             ((divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USD'].compra / divisas[select].venta).toFixed(2)) <= 100000 && (divisas && divisas[select] && divisas[select2] && (transferencia * divisas['USD'].compra / divisas[select].venta).toFixed(2)) > 10000 && divisas[select]['tarifa 3']),
//     }
//     const res = await fetch('/api', {
//         method: 'POST',
//         body: JSON.stringify({
//             type: 'Envio de Remesa',
//             ...body
//         }),
//         headers: new Headers({
//             'Content-Type': 'application/json; charset=UTF-8'
//         })
//     })
//     const data = await res.json()
//     window.open(data.url, "_self")
//     return
// }

