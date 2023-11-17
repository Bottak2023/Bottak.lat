'use client'
import { useState, useEffect } from 'react'
import { uploadStorage, downloadFile } from '@/firebase/storage'
import { useUser } from '@/context/Context.js'
import Input from '@/components/Input'
import SelectCountry from '@/components/SelectCountry'
import Label from '@/components/Label'
import Loader from '@/components/Loader'
import Button from '@/components/Button'
import Msg from '@/components/Msg'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'
import { getDayMonthYear } from '@/utils/date'
import { generateUUID } from '@/utils/UUIDgenerator'
import Link from 'next/link'
function Home() {

    const { nav, setNav, user, userDB, setUserProfile, select, setDestinatario, success, setUserData, postsIMG, setUserPostsIMG, modal, setModal, setTransferencia, transferencia, divisas, setDivisas, destinatario, qr, setQr, QRurl, setQRurl, countries } = useUser()
    const router = useRouter()

    const [postImage, setPostImage] = useState(undefined)
    const [urlPostImage, setUrlPostImage] = useState(undefined)

    function onChangeHandler(e) {
        setDestinatario({ ...destinatario, [e.target.name]: e.target.value })
    }

    function manageInputIMG(e) {
        const file = e.target.files[0]
        setPostImage(file)
        setUrlPostImage(URL.createObjectURL(file))
    }

    function save(e) {

        e.preventDefault()
        e.stopPropagation()

        console.log('button')

        const reader = new FileReader();
        reader.onloadend = () => {
            console.log(reader.result);
        } 
        reader.readAsDataURL(postImage);

        const uuid = generateUUID()
        const date = new Date().getTime()
        const fecha = getDayMonthYear(date)
        const db = {
            ...destinatario,
            fecha,
            date,
            uuid,
        }
 
        setModal('Guardando...')
        const callback = () => {
            router.push(`/Exitoso?uuid=${uuid}`)
            setModal('')  
        }
        destinatario.operacion === 'Cambio' 
        ? uploadStorage(`cambios/${uuid}`, postImage, db, callback)
        : uploadStorage(`envios/${uuid}`, postImage, db, callback)
        // writeUserData(`envios/${uuid}`, db, setUserSuccess, callback)

    }







downloadFile(`/currencies/${userDB.cca3.toUpperCase()}`)

function handlerDownload(url){
   

}




    // useEffect(() => {
    //     transferencia === '' && router.replace('/')
    // })


    return (
        <form className='w-full space-y-6 lg:grid lg:grid-cols-2 lg:gap-5' onSubmit={save}>
            {modal === 'Guardando...' && <Loader> {modal} </Loader>}
            <div className='w-full border-b-[2px] border-gray-100 col-span-2'>
                <h3 className=' pb-3 text-white  text-right'>Efectuar transacción</h3>
            </div>
            <div className='lg:hidden'>
                <h3 className='text-center pb-3  text-green-400 lg:hidden'>Elija una opcion de deposito Bancario</h3>
            </div>
            <div className=' space-y-5'>
                <Label htmlFor="">QR bancario</Label> 
                <Link href={countries[userDB.cca3].url ? countries[userDB.cca3].url : ''} className="w-full flex flex-col justify-center items-center" download >
                    <label  className=" flex flex-col justify-start items-center w-[200px] h-[230px] bg-white border border-gray-300 text-gray-900 text-[12px]  focus:ring-blue-500 focus:border-blue-500 rounded-[10px]" >
                        {countries && countries[userDB.cca3].url ? <img className=" flex justify-center items-center w-[200px] h-[200px] bg-white border border-gray-300 text-gray-900 text-[12px]  focus:ring-blue-500 focus:border-blue-500 rounded-[10px]" style={{ objectPosition: 'center' }} src={countries[userDB.cca3].url ? countries[userDB.cca3].url : ''} alt="" />
                            : 'QR no disponible'}
                            {destinatario && destinatario.importe} {destinatario && destinatario['divisa de envio']}
                    </label>
                </Link>
            </div>
            <div className=' space-y-5'>
                <Label htmlFor="">Cuenta bancaria</Label>
                <span className="block text-white text-center" >{countries && countries !== undefined && countries[userDB.cca3]['cuenta de cobro'] !== undefined && countries[userDB.cca3]['cuenta de cobro']} <br />
                    {countries && countries !== undefined && countries[userDB.cca3]['cuenta de cobro'] !== undefined && countries[userDB.cca3]['banco de cobro']}</span>
            </div>
           
            <div className='lg:hidden'>
                <h3 className='text-center pb-3  text-green-400 lg:hidden'>Informacion de transferencia</h3>
            </div>
            <div className=' space-y-5'>
                <Label htmlFor="">Baucher de transferencia</Label>
                <div className="w-full flex justify-center">
                    <label htmlFor="file" className="flex justify-center items-center w-[200px] h-[200px] bg-white border border-gray-300 text-center text-gray-900 text-[14px] focus:ring-blue-500 focus:border-blue-500 rounded-[10px]" >
                        {urlPostImage !== undefined? <img className="flex justify-center items-center w-[200px] h-[200px] bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 rounded-[10px]" style={{ objectPosition: 'center' }} src={urlPostImage} alt="" />
                            : 'Subir baucher'}
                    </label>
                    <input className="hidden" id='file' name='name' onChange={manageInputIMG} accept=".jpg, .jpeg, .png, .mp4, webm" type="file" required/>
                </div>
            </div>
            <div className=' space-y-5'>
                <Label htmlFor="">Banco de transferencia</Label>
                <Input type="text" name="banco de transferencia" onChange={onChangeHandler} required />
            </div>
            <div className=' space-y-5'>
                <Label htmlFor="">Numero de cuenta transferidora</Label>
                <Input type="text" name="cuenta transferidora" onChange={onChangeHandler} required />
            </div>
            {/* <div className=' space-y-5'>
                <Label htmlFor="">Titular de banco de transferencia</Label>
                <Input type="text" name="titular de banco" onChange={onChangeHandler} required />
            </div> */}
            <div className='flex w-full justify-around items-end'>
                <Button theme='Primary' >Guardar</Button>
            </div>
            {success == 'CompletePais' && <Msg>Seleccione un pais</Msg>}
        </form>
    )
}

export default WithAuth(Home)

