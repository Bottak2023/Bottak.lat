'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmail } from '@/firebase/utils'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import Error from '@/components/Error'

import Input from '@/components/Input'
import { useRouter } from 'next/navigation';



export default function Home() {

  const { user, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG } = useUser()
  const router = useRouter()

<<<<<<< HEAD
  // const signInHandler = async (e) => {
  //   e.preventDefault()
  //   let email = e.target[0].value
  //   let password = e.target[1].value

  //   if (email.length == 0 || password.length == 0) {
  //     return setUserSuccess('Complete')
  //   }
  //   const res = await signInWithEmail(email, password, setUserProfile)

  //   if (res == null) {
  //     setUserSuccess('Intente')
  //     return
  //   }

  //   if (res && (userDB == null || userDB == undefined)) {
  //     const data = await getSpecificData(`/users/${res.uid}`)
  //     data == null ? router.push('/Register') : router.push('/Register/Destinatario')
  //   }
  //   console.log()
  // }

  const signUpHandler = async (e) => {
    e.preventDefault()
    let email = e.target[0].value
    let password = e.target[1].value

    if (email.length == 0 || password.length == 0) {
      return setUserSuccess('Complete')
    }

    const res = await signUpWithEmail(email, password, setUserProfile)

    if (res == null) {
      setUserSuccess('Existe')
      return
    }

    router.push('/Register')




=======

  const signUpHandler = (e) => {
    e.preventDefault()
    router.push('/Register')
    e.preventDefault()
    let email = e.target[0].value
    let password = e.target[1].value
    console.log(email, password)
    signUpWithEmail(email, password, setUserProfile)
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
  }

  useEffect(() => {
    // user == undefined && onAuth(setUserProfile)
    // user && router.push('/Register')
  }, [user, success]);


  console.log(user)
  return (

        <form className="relative w-full max-w-[500px] h-full flex flex-col justify-between" onSubmit={signUpHandler} >
          <h5 className="text-[24px] font-medium text-white text-center">Registrate</h5>
          <div>
            <label htmlFor="email" className="block mb-2 text-[14px] text-left font-medium text-white">Email</label>
            <Input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-[14px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-[14px] text-left  font-medium text-white">Contraseña</label>
            <Input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-[14px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <div className="flex items-start">
            <a href="#" className="ml-auto text-green-400 text-[14px] text-blue-700 hover:underline">Olvidaste tu contraseña?</a>
          </div>
          <div className="w-full flex justify-center">

          <Button type="submit" theme="Primary">Continuar</Button>
          </div>

          <div className="text-[14px] font-medium text-gray-500 dark:text-gray-300 text-center">Ya tienes una cuenta? <Link href="/Login" className="text-green-400 hover:underline">Inicia Sessión</Link >
          </div>
        </form>

  )
}
{/*    {success == 'complete' && <Error>Llene todo el formulario</Error>} */ }




































// 'use client'


// import { writeUserData, getSpecificData } from '@/firebase/database'
// // import { uploadStorage } from '@/supabase/storage'
// import { useEffect, useState } from 'react'
// import { useUser } from '@/context/Context.js'
// import Input from '@/components/Input'
// import Select from '@/components/Select'
// import Label from '@/components/Label'
// import Checkbox from '@/components/Checkbox'
// import { getDayMonthYear } from '@/utils/date'
// import { WithAuth } from '@/HOCs/WithAuth'

// import Button from '@/components/Button'
// import { useMask } from '@react-input/mask';
// import { useRouter } from 'next/navigation';
// // import { WithAuth } from '@/HOCs/WithAuth'
// import dynamic from 'next/dynamic'
// const InvoicePDF = dynamic(() => import("@/components/pdf"), {
//     ssr: false,
// });

// function Home() {
//     const router = useRouter()

//     const { user, userDB, setUserData, setUserSuccess, destinatario, transferencia, fecha, setFecha} = useUser()
//     const [state, setState] = useState({})

//     const [postImage, setPostImage] = useState(null)
//     const [urlPostImage, setUrlPostImage] = useState(null)

//     const [account, setAccount] = useState('dependiente')





//     const inputRefCard = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
//     const inputRefDate = useMask({ mask: '__/__', replacement: { _: /\d/ } });
//     const inputRefCVC = useMask({ mask: '___', replacement: { _: /\d/ } });
//     const inputRefPhone = useMask({ mask: '+ 591 _ ___ ___', replacement: { _: /\d/ } });
//     const inputRefWhatsApp = useMask({ mask: '+ 591 __ ___ ___', replacement: { _: /\d/ } });


//     function manageInputIMG(e) {
//         // const fileName = `${e.target.name}`
//         const file = e.target.files[0]

//         setPostImage(file)
//         setUrlPostImage(URL.createObjectURL(file))

//     }


//     function onChangeHandler(e) {
//         setState({ ...state, [e.target.name]: e.target.value })
//     }
//     function onChangeHandlerCheck(e) {
//         setState({ ...state, [e.target.name]: e.target.checked })
//     }
//     function onClickHandler(name, value) {
//         setState({ ...state, [name]: value })
//     }
//     console.log(user)
// console.log(userDB)

//     function save(e) {
//         e.preventDefault()
//         router.push('/Register/Tarjeta')
//         // e.preventDefault()
//         // writeUserData('Clinica', { ...state, uuid: user.uuid }, user.uuid, userDB, setUserData, setUserSuccess, 'Se ha guardado correctamente', 'Perfil')
//         // uploadStorage('Clinica', postImage, user.uuid, updateUserData)
//         // router.push('/Clinica/Perfil')
//     }

//     useEffect(()=>{
//         const date = getDayMonthYear()
//         console.log(date)
//         setFecha(date)
//        userDB === undefined && getSpecificData(`/users/${user.uid}`, setUserData)
//     }, [user, userDB])


//     return (
//         <main>
//             <table class=" w-[300px] lg:w-full lg:min-w-auto text-[12px] text-left text-gray-500 rounded-[20px]">
//                 <thead class="text-[12px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                     <tr>
//                         <th scope="col-3" class="w-1/2 px-3 py-3">
//                             Datos
//                         </th>
//                         <th scope="col" class="px-3 py-3">
//                             Valores
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr class="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
//                         <td class="px-3 py-4  flex flex-col text-[12px] text-gray-700 dark:text-white">
//                         Remitente
//                         </td>
//                         <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
//                         {userDB && userDB.profile &&userDB.profile.nombre}
//                         </td>
//                     </tr>
//                     <tr class="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
//                         <td class="px-3 py-4  flex flex-col text-[12px] text-gray-700 dark:text-white">
//                         Destinatario
//                         </td>
//                         <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
//                         {destinatario.nombre && destinatario.nombre}
//                         </td>
//                     </tr>
//                     <tr class="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
//                         <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
//                         Cuenta destinatario:
//                         </td>
//                         <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
//                         {destinatario.tarjeta && destinatario.tarjeta}
//                         </td>
//                     </tr>
//                     <tr class="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >

//                         <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
//                         Divisa:
//                         </td>
//                         <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
//                          BOB
//                         </td>
//                     </tr>
//                     <tr class="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >

//                         <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
//                         Importe: 
//                         </td>
//                         <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
//                           {transferencia}
//                         </td>
//                     </tr>
//                     <tr class="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >

//                         <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
//                         Fecha: 
//                         </td>

//                         <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
//                         {fecha}
//                         </td>
//                     </tr>
                    
//                     <tr class="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >

//                         <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
//                         Estado:
//                         </td>
//                         <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
//                         En proceso
//                         </td>
//                      </tr>
//                     <tr class="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >

//                         <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
//                         Operacion:
//                         </td>
//                         <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
//                         Envio
//                         </td>
//                     </tr>


//                 </tbody>
           
//             </table>


//              <InvoicePDF />

//         </main >


//     )
// }

// export default WithAuth(Home)