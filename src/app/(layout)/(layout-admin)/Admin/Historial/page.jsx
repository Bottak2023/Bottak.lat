'use client'

import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import Modal from '@/components/Modal'
import { writeUserData, getSpecificData, removeData } from '@/firebase/database'

// import Select from '@/components/Select'
import { useUser } from '@/context/Context.js'

// import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';

import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState } from 'react'
// import { writeUserData, readUserData, updateUserData, deleteUserData } from '@/supabase/utils'
// import { uploadStorage } from '@/supabase/storage'
// import LoaderBlack from '@/components/LoaderBlack'
// import { disponibilidad as dispo} from '@/constants'

function Home() {
    const { user, userDB, users, setUsers, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, setItem, modal, setModal } = useUser()

    const router = useRouter()
    const [filter, setFilter] = useState('')
    const [state, setState] = useState({})
    async function save(i) {
        // console.log(state[i.uuid]['nombre de producto 1'])
        // setUserSuccess('Cargando')
        // await updateUserData('Producto', state[i.uuid], i.uuid)
        // postImage[i.uuid] && await uploadStorage('Producto', postImage[i.uuid], i.uuid, updateUserData, true)
        // const obj = { ...state }
        // delete obj[i.uuid]
        // setState(obj)
        // setUserSuccess('')
        // // state[i.uuid]['nombre de producto 1'] !== undefined && setUserDistributorPDB(undefined)
        // return  readUserData('Producto', 'Precio-Justo-SRL-Data', setUserDistributorPDB, 'distribuidor')
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

    function redirect() {
        router.push('Administrador/Plantilla/Agregar')
    }

    function sortArray(x, y) {
        if (x['nombre de producto 1'].toLowerCase() < y['nombre de producto 1'].toLowerCase()) { return -1 }
        if (x['nombre de producto 1'].toLowerCase() > y['nombre de producto 1'].toLowerCase()) { return 1 }
        return 0
    }

    console.log(users)
    useEffect(() => {
        users === undefined && getSpecificData(`/users/`, setUsers)

    }, [users])

    return (
        <div className='h-full'>
            <div class="relative left-0 h-full overflow-x-auto shadow-md p-5 bg-white min-h-[80vh]">
                {modal === 'Delete' && <Modal theme="Danger" button="Eliminar" funcion={deletConfirm}>Estas seguro de eliminar al siguiente usuario:  {item['nombre']}</Modal>}
                {modal === 'Habilitar' && <Modal theme="Primary" button="Habilitar" funcion={habilitarConfirm}>Estas seguro de habilitar al siguiente usuario:  {item['nombre']}</Modal>}
                {modal === 'Desabilitar' && <Modal theme="Danger" button="Desabilitar" funcion={desabilitarConfirm}>Estas seguro de Desabilitar al siguiente usuario:  {item['nombre']}</Modal>}

                <h3 className='font-medium text-[16px]'>Lista De Usuarios</h3>
                <br />
                <input type="text" className='border-b-[1px] text-[12px] outline-none w-[400px]' onChange={onChangeHandler} placeholder='Buscar Usuario' />
                <br />
                <br />
                {/* <div className='min-w-[1900px] flex justify-start items-center my-5 '>
                <h3 className="flex pr-12 text-[14px]" htmlFor="">Disponibilidad</h3>
                <div className="grid grid-cols-3 gap-4 w-[500px] ">
                    <Tag theme={disponibilidad == 'En 24 hrs' ? 'Primary' : 'Secondary'} click={() => setDisponibilidad(disponibilidad == 'En 24 hrs' ? '' : 'En 24 hrs')}>En 24 hrs</Tag>
                    <Tag theme={disponibilidad == 'Inmediato' ? 'Primary' : 'Secondary'} click={() => setDisponibilidad(disponibilidad == 'Inmediato' ? '' : 'Inmediato')}>Inmediato</Tag>
                    <Tag theme={disponibilidad == 'No disponible' ? 'Primary' : 'Secondary'} click={() => setDisponibilidad(disponibilidad == 'No disponible' ? '' : 'No disponible')}>No disponible</Tag>
                </div>
            </div>
            <div className='min-w-[1900px] flex justify-start items-center my-5  '>
                <h3 className="flex pr-12 text-[14px]">Categorias</h3>
                <div className="grid grid-cols-3 gap-4 w-[500px] " >
                    <Tag theme={categoria == 'Titanio' ? 'Primary' : 'Secondary'} click={() => setCategoria(categoria == 'Titanio' ? '' : 'Titanio')}>Titanio</Tag>
                    <Tag theme={categoria == 'Acero' ? 'Primary' : 'Secondary'} click={() => setCategoria(categoria == 'Acero' ? '' : 'Acero')}>Acero</Tag>
                    <Tag theme={categoria == 'Otros' ? 'Primary' : 'Secondary'} click={() => setCategoria(categoria == 'Otros' ? '' : 'Otros')}>Otros</Tag>
                </div>
            </div> */}

                <table class="w-full overflow-visible min-w-[1500px]  text-[12px] text-left text-gray-500 border-t-4 border-gray-400">
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
                                WhatsApp
                            </th>
                            <th scope="col" class="px-3 py-3">
                                Habilitar
                            </th>
                            <th scope="col" class="px-3 py-3">
                                Eliminar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users !== undefined && Object.keys(users).map((i, index) => {

                            return users[i].profile['nombre'].includes(filter) && <tr class="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
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
                                    <img src={users[i].profile.image1} alt="Apple Watch" />
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
                                <td class="px-3 py-4">
                                    {users && users[i].profile['habilitado'] === false
                                        ? <Button theme={"Primary"} click={() => manage(i, 'Habilitar')}>Habilitar</Button>
                                        : <Button theme={"Danger"} click={() => manage(i, 'Desabilitar')}>Desabilitar</Button>
                                    }
                                </td>
                                <td class="px-3 py-4">

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
