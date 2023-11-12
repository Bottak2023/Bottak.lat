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

import {getCurrencyExchange} from '@/currency'




export default function Home() {

  const { user, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG } = useUser()
  const router = useRouter()


 function handlerRedirect (rute) {
  router.push(rute)
 }


  useEffect(() => {
    // user == undefined && onAuth(setUserProfile, setUserData)
    // user && router.push('/Register')
  }, [user, success]);




  return (

    <main className='w-full h-full relative flex flex-col justify-center  lg:justify-start items-center p-5 '>
          {/* <img src="/logo.svg" className='h-[200px] w-[200px] hidden lg:block' alt="User" />
          <h1 className='text-[#FFF500] text-[14px]  hidden lg:block'>Cambios App</h1>
          <h3 className='text-black text-[14px]  hidden lg:block'>Tus transferencias mas faciles y seguras</h3>
          */}


      <div className='space-y-12 lg:grid  lg:grid-cols-3  lg:gap-5 justify-between items-end '>

        <div className='w-[350px] bg-white flex flex-col justify-center items-center rounded-[20px] p-5' onClick={()=>handlerRedirect('Admin/Usuarios')}>
          <svg width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50.75 86.75C38.25 86.75 27.2 80.35 20.75 70.75C20.9 60.75 40.75 55.25 50.75 55.25C60.75 55.25 80.6 60.75 80.75 70.75C77.4444 75.672 72.9793 79.7058 67.7478 82.4959C62.5163 85.286 56.679 86.7469 50.75 86.75ZM50.75 15.75C54.7282 15.75 58.5436 17.3304 61.3566 20.1434C64.1696 22.9564 65.75 26.7718 65.75 30.75C65.75 34.7282 64.1696 38.5436 61.3566 41.3566C58.5436 44.1696 54.7282 45.75 50.75 45.75C46.7718 45.75 42.9564 44.1696 40.1434 41.3566C37.3304 38.5436 35.75 34.7282 35.75 30.75C35.75 26.7718 37.3304 22.9564 40.1434 20.1434C42.9564 17.3304 46.7718 15.75 50.75 15.75ZM50.75 0.75C44.1839 0.75 37.6821 2.04329 31.6158 4.55602C25.5495 7.06876 20.0376 10.7517 15.3947 15.3947C6.01784 24.7715 0.75 37.4892 0.75 50.75C0.75 64.0108 6.01784 76.7285 15.3947 86.1053C20.0376 90.7483 25.5495 94.4312 31.6158 96.944C37.6821 99.4567 44.1839 100.75 50.75 100.75C64.0108 100.75 76.7285 95.4822 86.1053 86.1053C95.4822 76.7285 100.75 64.0108 100.75 50.75C100.75 23.1 78.25 0.75 50.75 0.75Z" fill="black" />
          </svg>
          <br />
          <Button theme='Primary'>Usuarios</Button>
        </div>

        <div className='w-[350px] bg-white flex flex-col justify-center items-center rounded-[20px] p-5' onClick={()=>handlerRedirect('Admin/Cambios')}>
          <svg width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50.6831 100.677C23.0681 100.677 0.683105 78.2916 0.683105 50.6766C0.683105 23.0616 23.0681 0.676636 50.6831 0.676636C78.2981 0.676636 100.683 23.0616 100.683 50.6766C100.683 78.2916 78.2981 100.677 50.6831 100.677ZM50.6831 35.6766H30.6831V45.6766H75.6831L50.6831 20.6766V35.6766ZM25.6831 55.6766L50.6831 80.6766V65.6766H70.6831V55.6766H25.6831Z" fill="black" />
          </svg>
          <br />
          <Button theme='Primary'>Transacciones y comisiones</Button>
        </div>

        <div className='w-[350px] bg-white flex flex-col justify-center items-center rounded-[20px] p-5' onClick={()=>handlerRedirect('Admin/Transacciones')}>
          <span className='bg-white'>
            <svg width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50.6831 100.677C23.0681 100.677 0.683105 78.2916 0.683105 50.6766C0.683105 23.0616 23.0681 0.676636 50.6831 0.676636C78.2981 0.676636 100.683 23.0616 100.683 50.6766C100.683 78.2916 78.2981 100.677 50.6831 100.677ZM50.6831 35.6766H30.6831V45.6766H75.6831L50.6831 20.6766V35.6766ZM25.6831 55.6766L50.6831 80.6766V65.6766H70.6831V55.6766H25.6831Z" fill="black" />
          </svg>
          </span>
          
          <br />
          <Button theme='Primary'>Transacciones</Button>
        </div>

        <div className='w-[350px] bg-white flex flex-col justify-center items-center rounded-[20px] p-5' onClick={()=>handlerRedirect('Admin/Cambios')}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.25 0C26.6211 0 22.5781 2.51953 20.4297 6.25H9.375C4.19922 6.25 0 10.4492 0 15.625V78.125C0 83.3008 4.19922 87.5 9.375 87.5H37.5V34.375C37.5 25.7422 44.4922 18.75 53.125 18.75H62.5V15.625C62.5 10.4492 58.3008 6.25 53.125 6.25H42.0703C39.9219 2.51953 35.8789 0 31.25 0ZM53.125 25C47.9492 25 43.75 29.1992 43.75 34.375V90.625C43.75 95.8008 47.9492 100 53.125 100H90.625C95.8008 100 100 95.8008 100 90.625V50H81.25C77.793 50 75 47.207 75 43.75V25H53.125ZM31.25 7.8125C32.4932 7.8125 33.6855 8.30636 34.5646 9.18544C35.4436 10.0645 35.9375 11.2568 35.9375 12.5C35.9375 13.7432 35.4436 14.9355 34.5646 15.8146C33.6855 16.6936 32.4932 17.1875 31.25 17.1875C30.0068 17.1875 28.8145 16.6936 27.9354 15.8146C27.0564 14.9355 26.5625 13.7432 26.5625 12.5C26.5625 11.2568 27.0564 10.0645 27.9354 9.18544C28.8145 8.30636 30.0068 7.8125 31.25 7.8125ZM81.25 25V43.75H100L81.25 25Z" fill="black" />
          </svg>
          <br />
          <Button theme='Primary'>Cambios</Button>
        </div>
        
        <div className='w-[350px] bg-white flex flex-col justify-center items-center rounded-[20px] p-5' onClick={()=>handlerRedirect('Admin/Paises')}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.25 0C26.6211 0 22.5781 2.51953 20.4297 6.25H9.375C4.19922 6.25 0 10.4492 0 15.625V78.125C0 83.3008 4.19922 87.5 9.375 87.5H37.5V34.375C37.5 25.7422 44.4922 18.75 53.125 18.75H62.5V15.625C62.5 10.4492 58.3008 6.25 53.125 6.25H42.0703C39.9219 2.51953 35.8789 0 31.25 0ZM53.125 25C47.9492 25 43.75 29.1992 43.75 34.375V90.625C43.75 95.8008 47.9492 100 53.125 100H90.625C95.8008 100 100 95.8008 100 90.625V50H81.25C77.793 50 75 47.207 75 43.75V25H53.125ZM31.25 7.8125C32.4932 7.8125 33.6855 8.30636 34.5646 9.18544C35.4436 10.0645 35.9375 11.2568 35.9375 12.5C35.9375 13.7432 35.4436 14.9355 34.5646 15.8146C33.6855 16.6936 32.4932 17.1875 31.25 17.1875C30.0068 17.1875 28.8145 16.6936 27.9354 15.8146C27.0564 14.9355 26.5625 13.7432 26.5625 12.5C26.5625 11.2568 27.0564 10.0645 27.9354 9.18544C28.8145 8.30636 30.0068 7.8125 31.25 7.8125ZM81.25 25V43.75H100L81.25 25Z" fill="black" />
          </svg>
          <br />
          <Button theme='Primary'>Paises</Button>
        </div>
      </div>


    </main>

  )
}
