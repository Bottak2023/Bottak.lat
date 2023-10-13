'use client'


// import { writeUserData, readUserData, updateUserData } from '@/supabase/utils'
// import { uploadStorage } from '@/supabase/storage'
import React, { useState, useEffect } from 'react'
import { useUser } from '@/context/Context.js'
import Input from '@/components/Input'
import Select from '@/components/Select'
import Label from '@/components/Label'
import Checkbox from '@/components/Checkbox'
import WebCamp from '@/components/WebCamp'
import Button from '@/components/Button'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'
<<<<<<< HEAD
import Error from '@/components/Msg'

function Home() {
    const router = useRouter()
    const { user, userDB, setUserData, success, setUserSuccess, image1, setImage1, image2, setImage2, image3, setImage3, webcamRef1, webcamRef2, webcamRef3, } = useUser()

    function save(e) {
        e.preventDefault()
        image1 ? router.push('/Register/DNI') : setUserSuccess('Capture')
=======


function Home() {
    const router = useRouter()
    const { user, userDB, setUserData, setUserSuccess, 		image1, setImage1, image2, setImage2, image3, setImage3,  webcamRef1, webcamRef2, webcamRef3,  } = useUser()

    function save(e) {
        e.preventDefault()
        router.push('/Register/DNI')
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
    }

    return (
        <div className=' space-y-6'>
            <div className='w-full border-b-[2px] border-gray-100 lg:hidden'>
                <h3 className='text-center pb-3 text-white  text-right'>Bienvenido {user ? user.email : 'Pepe'}</h3>
            </div>
            <Button theme="Primary">Sube una foto tuya sosteniendo tu DNI</Button>
<<<<<<< HEAD
            <WebCamp takePhoto='Capture1' />
            <div className='flex w-full justify-around'>
                <Button theme={image1 ? 'Primary' : 'Disable'} click={save}>Continuar</Button>
            </div>
            {success == 'Capture' && <Error>ERROR: Debe tomar una foto</Error>}
=======
            <WebCamp  takePhoto='Capture1' />
            <div className='flex w-full justify-around'>
                <Button theme='Primary' click={save}>Continuar</Button>
            </div>
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
        </div>
    )
}
export default WithAuth(Home)



