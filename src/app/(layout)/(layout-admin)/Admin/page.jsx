'use client';

import Link from 'next/link'
import Button from '@/components/Button'

const cardsDB = [
  {
    title: 'Usuarios',
    img: '/usuarios.png',
    url: '/Admin/Usuarios',
  },
  {
    title: 'Remesas',
    img: '/remesas.png',
    url: '/Admin/Remesas',
  },
  {
    title: 'Cambios',
    img: '/cambios.png',
    url: '/Admin/Cambios',
  },
  {
    title: 'Tarifas y comisiones',
    img: '/tarifas.png',
    url: '/Admin/Tarifas',
  },
  {
    title: 'Paises',
    img: '/paises.png',
    url: '/Admin/Paises',
  },
]

function Card({i}) {
  
  return <Link href={i.url} >
    <div className='w-full sm:min-w-[300px] sm:max-w-[500px] bg-[#7700ff] flex flex-col justify-center items-center rounded-[20px] p-5'>
      <img src={i.img} className='block h-[100px] mb-5' alt={i.title} />
      <Button theme='Primary' >{i.title}</Button>
    </div>
  </Link>
}


export default function Home() {

  return (
    <main className='w-full  relative flex flex-col justify-center items-center '>
      <div className='w-full   min-h-full space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-10 lg:grid-cols-3   '>
        {
          cardsDB.map((i) => <Card i={i} key={i.title} />)
        }
      </div>
    </main>
  )
}
