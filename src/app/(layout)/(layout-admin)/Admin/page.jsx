'use client';
import { useUser } from '@/context/Context'
import { onAuth, signUpWithEmail } from '@/firebase/utils'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation';


const cardsDB = [
  {
    title: 'Usuarios',
    img: '/usuarios.png',
    url: '/Usuarios',
  },
  {
    title: 'Remesas',
    img: '/remesas.png',
    url: '/Remesas',
  },
  {
    title: 'Cambios',
    img: '/cambios.png',
    url: '/Cambios',
  },
  {
    title: 'Tarifas y comisiones',
    img: '/tarifas.png',
    url: '/Tarifas',
  },
  {
    title: 'Paises',
    img: '/paises.png',
    url: '/Paises',
  },
]

function Card({i}) {
  
  return <Link href={i.url}>
    <div className='w-[350px] bg-[#7700ff] flex flex-col justify-center items-center rounded-[20px] p-5'>
      <img src={i.img} className='block h-[100px] mb-5' alt={i.title} />
      <Button theme='Primary' >{i.title}</Button>
    </div>
  </Link>
}


export default function Home() {
  const { user, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG } = useUser()

  return (
    <main className='w-full h-full relative flex flex-col justify-center  lg:justify-start items-center p-5 '>
      <div className='lg:grid  lg:grid-cols-3  lg:gap-5 justify-between items-end '>
        {
          cardsDB.map((i) => <Card i={i} key={i.title} />)
        }
      </div>
    </main>
  )
}
