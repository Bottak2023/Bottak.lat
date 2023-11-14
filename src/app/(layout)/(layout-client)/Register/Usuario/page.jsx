'use client'


import { writeUserData, getSpecificData } from '@/firebase/database'
import { useState } from 'react'
import { useUser } from '@/context/Context.js'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Loader from '@/components/Loader'
import SelectCountry from '@/components/SelectCountry'
import Button from '@/components/Button'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'

function Home() {
    const { user, userDB, setUserData, setUserSuccess, select3, setSelect3, isSelect3, setIsSelect3, image1, setImage1, image2, setImage2, image3, transferencia, countries, setCountries, modal, setModal} = useUser()
    const [state, setState] = useState({})
    const inputRefWhatsApp = useMask({ mask: '+ 591 __ ___ ___', replacement: { _: /\d/ } });
    const router = useRouter()

    function onChangeHandler(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const handlerCountrySelect = (i) => {
        setState({ ...state, ['pais']: i })
    }
    const handlerIsSelect = () => {
        setIsSelect3(!isSelect3)
    }
    function save(e) {
        e.preventDefault()
        const data = { ...state, image1, image2, image3, rol: 'Cliente', uuid: user.uid, habilitado: false, bloqueado: false }
        setModal('Guardando...')
        const callback = () => {
            getSpecificData(`/users/${user.uid}`, setUserData)
            setModal('')
        }
        writeUserData(`users/${user.uid}`, data , setUserSuccess, callback)
        transferencia ? router.replace('/') : router.replace('/')
    }
    return (
        <form className='relative portrait:min-h-[87vh] space-y-6 w-full  ' onSubmit={save}>
            {modal === 'Guardando...' && <Loader> {modal} </Loader>}
            <div className='w-full border-b-[2px] border-gray-100 '>
                <h3 className=' pb-3 text-white  text-right'>Completa tus datos</h3>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className=' space-y-5'>
                    <Label htmlFor="">Nombre</Label>
                    <Input type="text" name="nombre" onChange={onChangeHandler} required />
                </div>
                <div className=' space-y-5'>
                    <Label htmlFor="">DNI</Label>
                    <Input type="text" name="dni" onChange={onChangeHandler} required />
                </div>
                <div className=' space-y-5'>
                    <Label htmlFor="">Pais</Label>
                    <SelectCountry name="pais" propHandlerIsSelect={handlerIsSelect} propIsSelect={isSelect3} operation="recepcion" click={handlerCountrySelect} />
                </div>
                <div className=' space-y-5'>
                    <Label htmlFor="">Dirección</Label>
                    <Input type="text" name="direccion" onChange={onChangeHandler} required />
                </div>
                <div className=' space-y-5'>
                    <Label htmlFor="">Whatsapp</Label>
                    <Input type="text" name="whatsapp" onChange={onChangeHandler} required />
                </div>
            </div>
            <div className='flex w-full justify-around'>
                <Button theme='Primary'>Guardar</Button>
            </div>
        </form>
    )
}

export default WithAuth(Home)
