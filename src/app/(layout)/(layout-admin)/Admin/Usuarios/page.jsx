'use client'

import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import Modal from '@/components/Modal'

// import ModalMSG from '@/components/ModalMSG'
import { writeUserData, getSpecificData, removeData } from '@/firebase/database'
// import TextEditor from '@/components/TextEditor'

import { useUser } from '@/context/Context.js'


import { useRouter } from 'next/navigation';

import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState } from 'react'



function Home() {
    const { user, userDB, users, setUsers, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, setItem, modal, setModal } = useUser()

    const router = useRouter()
    const [filter, setFilter] = useState('')
    const [state, setState] = useState({})
    async function save(i) {


    }


    function onChangeHandler(e) {
        setFilter(e.target.value)
    }


    async function deletConfirm() {
        // await deleteUserData('Producto', item.uuid)
        // await readUserData('Producto', 'Precio-Justo-SRL-Data', setUserDistributorPDB, 'distribuidor')
        // setModal(false)
    }

    async function habilitarConfirm() {
        writeUserData(`users/${item}/profile`, { habilitado: true }, setUserSuccess)
        return getSpecificData(`/users/`, setUsers)
    }

    async function desabilitarConfirm() {

        writeUserData(`users/${item}/profile`, { habilitado: false }, setUserSuccess)
        return getSpecificData(`/users/`, setUsers)

        // await deleteUserData('Producto', item.uuid)
        // await readUserData('Producto', 'Precio-Justo-SRL-Data', setUserDistributorPDB, 'distribuidor')
        // setModal(false)
    }

    function manage(i, data) {
        setItem(i)
        setModal(data)
        console.log(users[item])
    }

    function handlerWhatsapp(i) {
        window.open('')
    }

    function redirect() {
        router.push('Administrador/Plantilla/Agregar')
    }

    function sortArray(x, y) {
        if (x['nombre de producto 1'].toLowerCase() < y['nombre de producto 1'].toLowerCase()) { return -1 }
        if (x['nombre de producto 1'].toLowerCase() > y['nombre de producto 1'].toLowerCase()) { return 1 }
        return 0
    }



    useEffect(() => {
        users === undefined && getSpecificData(`/users/`, setUsers)

    }, [users])

    return (
        <div className='h-full'>
            <div class="relative left-0 h-full overflow-x-auto shadow-md p-5 bg-white min-h-[80vh]">
                {modal === 'Delete' && <Modal theme="Danger" button="Eliminar" funcion={deletConfirm}>Estas seguro de eliminar al siguiente usuario:  {item['nombre']}</Modal>}
                {modal === 'Habilitar' && <Modal theme="Primary" button="Habilitar" funcion={habilitarConfirm}>Estas seguro de habilitar al siguiente usuario:  {item['nombre']}</Modal>}
                {modal === 'Desabilitar' && <Modal theme="Danger" button="Desabilitar" funcion={desabilitarConfirm}>Estas seguro de Desabilitar al siguiente usuario:  {item['nombre']}</Modal>}

                {/* {modal === 'SendMSG' && <ModalMSG theme="Danger" button="Desabilitar" funcion={desabilitarConfirm}></ModalMSG>} */}


                <h3 className='font-medium text-[16px]'>Lista De Usuarios</h3>
                <br />
                <input type="text" className='border-b-[1px] text-[12px] outline-none w-[400px]' onChange={onChangeHandler} placeholder='Buscar Usuario' />
                <br />
                <br />



                <table class="w-full overflow-visible min-w-[1900px]  text-[12px] text-left text-gray-500 border-t-4 border-gray-400">

                    <thead class="text-[12px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-3 py-3">
                                #
                            </th>
                            <th scope="col" class="px-3 py-3">
                                Nombre
                            </th>
                            <th scope="col" class="px-3 py-3">
                                DNI
                            </th>
                            <th scope="col" class="px-3 py-3">
                                Pais
                            </th>
                            <th scope="col" class="px-3 py-3">
                                Foto 1
                            </th>
                            <th scope="col" class="px-3 py-3">
                                Foto 2
                            </th>
                            <th scope="col" class="px-8 py-3">
                                Foto 3
                            </th>
                            <th scope="col" class="px-8 py-3">

                                Celular
                            </th>

                            <th scope="col" class="px-3 py-3 ">
                                Habilitar
                            </th>
                            <th scope="col" class="px-8 py-3 text-center">
                                WhatsApp
                            </th>
                            <th scope="col" class="px-8 py-3 ">
                                Mensaje
                            </th>
                            <th scope="col" class="px-3 py-3 ">

                                Eliminar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users !== undefined && Object.keys(users).map((i, index) => {


                            return users[i].profile['nombre'].toLowerCase().includes(filter.toLowerCase()) && <tr class="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>

                                <td class="px-3 py-4  flex font-semibold text-gray-900 dark:text-white">
                                    <span className='h-full flex py-2'>{index + 1}</span>
                                </td>
                                <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                    {users[i].profile['nombre']}
                                </td>
                                <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                    {users[i].profile['dni']}
                                </td>
                                <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                    {users[i].profile['pais']}
                                </td>
                                <td class="w-32 p-4">

                                    <img src={users[i].profile.image1} className='' alt="Apple Watch" />

                                </td>
                                <td class="w-32 p-4">
                                    <img src={users[i].profile.image2} alt="Apple Watch" />
                                </td>
                                <td class="w-32 p-4">
                                    <img src={users[i].profile.image3} alt="Apple Watch" />
                                </td>
                                <td class="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                    {users[i].profile['whatsapp']}
                                </td>

                                <td class="px-3 py-4 ">

                                    {users && users[i].profile['habilitado'] === false
                                        ? <Button theme={"Primary"} click={() => manage(i, 'Habilitar')}>Habilitar</Button>
                                        : <Button theme={"Danger"} click={() => manage(i, 'Desabilitar')}>Desabilitar</Button>
                                    }
                                </td>


                                <td class="px-3 py-4">
                                    <div className='flex w-full justify-center'>
                                        <span onClick={() => handlerWhatsapp(users[i].profile['whatsapp'])}>

                                            <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_14_2)">
                                                    <path d="M0.640234 14.9363C0.639531 17.4765 1.30328 19.9569 2.56539 22.1432L0.519531 29.6129L8.16391 27.6086C10.2782 28.7596 12.6472 29.3627 15.0545 29.3629H15.0609C23.0079 29.3629 29.477 22.8961 29.4804 14.9476C29.482 11.096 27.9834 7.47423 25.2606 4.74939C22.5384 2.02478 18.9179 0.523486 15.0603 0.521729C7.11227 0.521729 0.643633 6.98814 0.640352 14.9363" fill="url(#paint0_linear_14_2)" />
                                                    <path d="M0.125391 14.9316C0.12457 17.5632 0.812109 20.1323 2.11922 22.3969L0 30.1344L7.91848 28.0582C10.1003 29.2478 12.5568 29.875 15.0564 29.8759H15.0628C23.295 29.8759 29.9965 23.1765 30 14.9435C30.0014 10.9535 28.4489 7.20152 25.6289 4.37906C22.8086 1.55695 19.0586 0.00164063 15.0628 0C6.82922 0 0.128672 6.69844 0.125391 14.9316ZM4.84102 22.0069L4.54535 21.5375C3.30246 19.5613 2.64645 17.2775 2.64738 14.9325C2.65008 8.08934 8.2193 2.52188 15.0675 2.52188C18.3839 2.52328 21.5006 3.81609 23.8448 6.16172C26.1889 8.50758 27.4788 11.6259 27.478 14.9426C27.475 21.7857 21.9056 27.3539 15.0628 27.3539H15.0579C12.8298 27.3527 10.6446 26.7544 8.73891 25.6236L8.28539 25.3547L3.58641 26.5867L4.84102 22.0068V22.0069Z" fill="url(#paint1_linear_14_2)" />
                                                    <path d="M11.3293 8.68921C11.0497 8.06777 10.7554 8.05523 10.4895 8.04433C10.2718 8.03495 10.0229 8.03566 9.77422 8.03566C9.52531 8.03566 9.1209 8.12929 8.77906 8.50253C8.43687 8.87613 7.47266 9.77894 7.47266 11.6151C7.47266 13.4515 8.81012 15.226 8.99656 15.4753C9.18324 15.7241 11.5786 19.6128 15.3721 21.1089C18.525 22.3521 19.1666 22.1048 19.8508 22.0425C20.5352 21.9804 22.0591 21.1399 22.37 20.2684C22.6811 19.397 22.6811 18.65 22.5879 18.4939C22.4946 18.3384 22.2457 18.245 21.8724 18.0585C21.4991 17.8718 19.6641 16.9689 19.3221 16.8443C18.9799 16.7198 18.7311 16.6577 18.4822 17.0314C18.2333 17.4046 17.5186 18.245 17.3007 18.4939C17.0831 18.7434 16.8652 18.7745 16.4921 18.5878C16.1186 18.4005 14.9166 18.0069 13.4906 16.7355C12.3811 15.7462 11.632 14.5246 11.4143 14.1509C11.1965 13.7777 11.3909 13.5755 11.5781 13.3895C11.7458 13.2223 11.9514 12.9537 12.1382 12.7358C12.3243 12.5178 12.3864 12.3623 12.5109 12.1134C12.6355 11.8643 12.5731 11.6463 12.48 11.4596C12.3864 11.273 11.6612 9.42714 11.3293 8.68921Z" fill="white" />
                                                </g>
                                                <defs>
                                                    <linearGradient id="paint0_linear_14_2" x1="1448.56" y1="2909.64" x2="1448.56" y2="0.521729" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#1FAF38" />
                                                        <stop offset="1" stop-color="#60D669" />
                                                    </linearGradient>
                                                    <linearGradient id="paint1_linear_14_2" x1="1500" y1="3013.44" x2="1500" y2="0" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#F9F9F9" />
                                                        <stop offset="1" stop-color="white" />
                                                    </linearGradient>
                                                    <clipPath id="clip0_14_2">
                                                        <rect width="30" height="30.2344" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </span>

                                    </div>
                                </td>
                                <td class="px-3 py-4 flex ">
                                    <Button theme={"Danger"} click={() => manage(i, 'SendMSG')}>Enviar msg</Button>
                                </td>
                                <td class="px-3 py-4 ">
                                    <Button theme={"Danger"} click={() => manage(i, 'Delete')}>Eliminar</Button>

                                </td>
                            </tr>
                        })
                        }
                    </tbody>
                </table>







                {success == 'Cargando' && <LoaderBlack />}

            </div>

        </div>

    )
}




export default WithAuth(Home)
