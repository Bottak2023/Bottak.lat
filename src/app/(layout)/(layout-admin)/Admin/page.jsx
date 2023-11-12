'use client';

import Link from 'next/link'
import Button from '@/components/Button'

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
  
  return <Link href={i.url} className='block'>
    <div className='w-full sm:min-w-[300px] sm:max-w-[500px] bg-[#7700ff] flex flex-col justify-center items-center rounded-[20px] p-5'>
      <img src={i.img} className='block h-[100px] mb-5' alt={i.title} />
      <Button theme='Primary' >{i.title}</Button>
    </div>
  </Link>
}


export default function Home() {

  return (
    <main className='w-full  relative flex flex-col justify-center items-center p-5 '>
      <div className='w-auto bg-yellow-500  min-h-full space-y-12 md:grid md:grid-cols-2 md:gap-10 lg:grid-cols-3   '>
        {
          cardsDB.map((i) => <Card i={i} key={i.title} />)
        }
      </div>
    </main>
  )
}
