
import { UserProvider } from '../context/Context'
import './globals.css'
import { Montserrat } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Montserrat({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/logo.png' />
        <meta name="theme-color" content="black" />
        <meta name="msapplication-navbutton-color" content="black" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="description" content="Tranferencias y cambios de divisas" />
        <meta name="keywords" content="Logistics Gear" />
        <meta name="author" content="Logistics Gear" />
        <title>Bottak</title>
      </head>
      <body className={`${inter.className} relative w-screen min-h-screen`}
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}>
        <UserProvider>
          <div className="relative w-screen  h-screen min-h-[500px]  overflow-x-hidden overflow-y-auto " style={{
            backgroundImage: 'linear-gradient(#000000c7, #000000c7)',
          }}>
            {children}
          </div>
          {/* <Navbar /> */}

        </UserProvider>
      </body>
    </html>
  )
}


