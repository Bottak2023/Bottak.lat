'use client'


import { writeUserData } from '@/firebase/database'
// import { uploadStorage } from '@/supabase/storage'
import { useState } from 'react'
import { useUser } from '@/context/Context.js'
import Input from '@/components/Input'
import Select from '@/components/Select'
import Label from '@/components/Label'
import Checkbox from '@/components/Checkbox'
import { arrPaises } from '@/constants'


import SelectCountry from '@/components/SelectCountry'


import Button from '@/components/Button'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'


function Home() {
    const router = useRouter()


    const { user, userDB, setUserData, setUserSuccess, select3, setSelect3, isSelect3, setIsSelect3, image1, setImage1, image2, setImage2, image3, transferencia } = useUser()

    const [state, setState] = useState({})

    const [postImage, setPostImage] = useState(null)
    const [urlPostImage, setUrlPostImage] = useState(null)

    const [account, setAccount] = useState('dependiente')






    const inputRefCard = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
    const inputRefDate = useMask({ mask: '__/__', replacement: { _: /\d/ } });
    const inputRefCVC = useMask({ mask: '___', replacement: { _: /\d/ } });
    const inputRefPhone = useMask({ mask: '+ 591 _ ___ ___', replacement: { _: /\d/ } });
    const inputRefWhatsApp = useMask({ mask: '+ 591 __ ___ ___', replacement: { _: /\d/ } });


    function manageInputIMG(e) {
        // const fileName = `${e.target.name}`
        const file = e.target.files[0]

        setPostImage(file)
        setUrlPostImage(URL.createObjectURL(file))

    }


    function onChangeHandler(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handlerSelect = (i) => {
        setSelect3(i)

    }
    const handlerIsSelect = () => {
        setIsSelect3(!isSelect3)

    }
    console.log(user)
    console.log(state)
    function save(e) {
        e.preventDefault()

        writeUserData(`users/${user.uid}/profile`, { ...state, image1, image2, image3 }, setUserSuccess,)
        // uploadStorage('Clinica', postImage, user.uuid, updateUserData)
        // router.push('/Clinica/Perfil')
        transferencia ? router.push('/Register/Destinatario') : router.push('/')



    }
    return (
        <form className=' space-y-6 w-full'>
            <div className='w-full border-b-[2px] border-gray-100 '>
                <h3 className='text-center pb-3 text-white  text-right'>Completa tus datos</h3>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className=' space-y-5'>
                    <Label htmlFor="">Nombre</Label>

                    <Input type="text" name="nombre" onChange={onChangeHandler} require />
                </div>
                <div className=' space-y-5'>
                    <Label htmlFor="">DNI</Label>
                    <Input type="text" name="dni" onChange={onChangeHandler} require />
                </div>
                <div className=' space-y-5'>
                    <Label htmlFor="">Pais</Label>
                    <SelectCountry onChange="Transference" placeholder='Monto a transferir' propHandlerSelect={handlerSelect} propSelect={select3} propHandlerIsSelect={handlerIsSelect} propIsSelect={isSelect3} />
                </div>
                <div className=' space-y-5'>
                    <Label htmlFor="">Dirección</Label>
                    <Input type="text" name="direccion" onChange={onChangeHandler} require />
                </div>
                <div className=' space-y-5'>
                    <Label htmlFor="">Whatsapp</Label>
                    <Input type="text" name="whatsapp" onChange={onChangeHandler} reference={inputRefWhatsApp} require />

                </div>
            </div>
            <div className='flex w-full justify-around'>
                <Button theme='Primary' click={save}>Guardar</Button>
            </div>
        </form>
    )
}

export default WithAuth(Home)
