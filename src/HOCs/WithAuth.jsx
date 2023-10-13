'use client'

import Loader from '@/components/Loader'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/Context.js'
import { onAuth, } from '@/firebase/utils'
import { getSpecificData, } from '@/firebase/database'

export function WithAuth(Component) {
    return () => {
        const { user, userDB, setUserProfile, setUserData, divisas, setDivisas } = useUser()
        const router = useRouter()

        useEffect(() => {
<<<<<<< HEAD
            if (user === undefined) onAuth(setUserProfile)
            // if(user === null) router.push('/')
            if (user !== undefined && user !== null && userDB === undefined) getSpecificData(`/users/${user.uid}`, setUserData)
            // if(user !== undefined && user !== null ) {
            //     console.log('get')
=======
            if(user === undefined) onAuth(setUserProfile)
            // if(user === null) router.push('/')
            if(user !== undefined && user !== null && userDB === undefined)getSpecificData(`/users/${user.uid}`, setUserData)
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d

            //    getSpecificData(`/users/${user.uuid}`, setUserData) 
            // } 

            Object.keys(divisas).length < 0 && getSpecificData('divisas', setDivisas)
        }, [user, userDB])
        console.log(divisas)
        return (
            <>
                {user === undefined && <Loader />}
                {user && <Component {...arguments} />}
            </>
        )
    }
}