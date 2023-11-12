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

import Error from '@/components/Msg'

function Home() {
    const router = useRouter()
    const { user, userDB, setUserData, success, setUserSuccess, 		image1, setImage1, image2, setImage2, image3, setImage3,  webcamRef1, webcamRef2, webcamRef3,  } = useUser()

    function save(e) {
        e.preventDefault()
        image2 ? router.push('/Register/DNIreverse') : setUserSuccess('Capture')

    }

    return (
        <div className='relative w-full h-full  flex flex-col items-center space-y-6'>
            <div className='w-full  lg:hidden'>
                <h3 className='text-center pb-3 text-white  '>Bienvenido {user ? user.email : 'Pepe'}</h3>
            </div>
            <Button theme="Primary">Sube una foto frontal de tu DNI</Button>
            <WebCamp  takePhoto='Capture2' />
            <div className='flex w-full justify-around'>

                <Button theme={image2 ? 'Primary' : 'Disable'} click={save}>Continuar</Button>
            </div>
            {success == 'Capture' && <Error>ERROR: Debe tomar una foto</Error>}

        </div>
    )
}
export default WithAuth(Home)



