'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useUser } from '@/context/Context'
import { useRouter } from 'next/navigation';
import Tag from '@/components/Tag'
import { handleSignOut } from '@/firebase/utils'
function Historial() {
    return <span className='inline-block p-5 rounded-full bg-[black]'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.7544 6.79529L15.9405 0.207059C15.7836 0.0746424 15.5708 0.000164755 15.3488 0H1.95349C1.43539 0 0.938514 0.173529 0.572164 0.482412C0.205813 0.791296 0 1.21023 0 1.64706V22.3529C0 22.7898 0.205813 23.2087 0.572164 23.5176C0.938514 23.8265 1.43539 24 1.95349 24H22.0465C22.5646 24 23.0615 23.8265 23.4278 23.5176C23.7942 23.2087 24 22.7898 24 22.3529V7.29412C23.9998 7.10697 23.9115 6.92755 23.7544 6.79529ZM16.186 2.40941L21.1423 6.58824H16.186V2.40941ZM22.0465 22.5882H1.95349C1.87947 22.5882 1.80849 22.5634 1.75616 22.5193C1.70382 22.4752 1.67442 22.4153 1.67442 22.3529V1.64706C1.67442 1.58465 1.70382 1.52481 1.75616 1.48068C1.80849 1.43655 1.87947 1.41176 1.95349 1.41176H14.5116V7.29412C14.5116 7.48133 14.5998 7.66087 14.7568 7.79325C14.9138 7.92563 15.1268 8 15.3488 8H22.3256V22.3529C22.3256 22.4153 22.2962 22.4752 22.2438 22.5193C22.1915 22.5634 22.1205 22.5882 22.0465 22.5882ZM17.3023 12.9412C17.3023 13.1284 17.2141 13.3079 17.0571 13.4403C16.9001 13.5727 16.6872 13.6471 16.4651 13.6471H7.53488C7.31284 13.6471 7.0999 13.5727 6.94289 13.4403C6.78588 13.3079 6.69767 13.1284 6.69767 12.9412C6.69767 12.754 6.78588 12.5744 6.94289 12.442C7.0999 12.3097 7.31284 12.2353 7.53488 12.2353H16.4651C16.6872 12.2353 16.9001 12.3097 17.0571 12.442C17.2141 12.5744 17.3023 12.754 17.3023 12.9412ZM17.3023 16.7059C17.3023 16.8931 17.2141 17.0726 17.0571 17.205C16.9001 17.3374 16.6872 17.4118 16.4651 17.4118H7.53488C7.31284 17.4118 7.0999 17.3374 6.94289 17.205C6.78588 17.0726 6.69767 16.8931 6.69767 16.7059C6.69767 16.5187 6.78588 16.3391 6.94289 16.2067C7.0999 16.0744 7.31284 16 7.53488 16H16.4651C16.6872 16 16.9001 16.0744 17.0571 16.2067C17.2141 16.3391 17.3023 16.5187 17.3023 16.7059Z" fill="white" />
        </svg>
    </span>
}
function Remesas() {
    return <span className='inline-block p-5 rounded-full bg-[black]'>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.8347 10.4864C24.4461 8.29325 23.387 6.25623 21.7886 4.62755C20.1902 2.99888 18.1227 1.85009 15.8421 1.32342C13.5615 0.796746 11.1678 0.915327 8.95763 1.66448C6.74742 2.41363 4.81767 3.76045 3.40732 5.53817C1.99697 7.3159 1.16796 9.44646 1.02293 11.6661C0.877902 13.8857 1.42323 16.0968 2.59139 18.0258C3.75955 19.9547 5.49924 21.5167 7.59505 22.5183C9.69087 23.52 12.0508 23.9173 14.3826 23.6612M1.79977 8.57905H24.2M1.79977 16.158H14.9999" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.3331 1.00012C10.0869 4.41016 8.896 8.349 8.896 12.3685C8.896 16.3881 10.0869 20.3269 12.3331 23.737M13.6664 1.00012C15.9185 4.41702 17.1097 8.36552 17.1038 12.3938M24.9999 16.158H21.6665C21.1361 16.158 20.6274 16.3576 20.2523 16.713C19.8772 17.0683 19.6665 17.5502 19.6665 18.0528C19.6665 18.5553 19.8772 19.0372 20.2523 19.3925C20.6274 19.7479 21.1361 19.9475 21.6665 19.9475H22.9999C23.5303 19.9475 24.039 20.1471 24.4141 20.5024C24.7892 20.8578 24.9999 21.3397 24.9999 21.8422C24.9999 22.3447 24.7892 22.8267 24.4141 23.182C24.039 23.5373 23.5303 23.737 22.9999 23.737H19.6665M22.3332 23.737V25.0001M22.3332 14.8949V16.158" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </span>
}
function Cambios() {
    return <span className='inline-block p-5 rounded-full bg-[black]'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.0001 1.125V1.61719C13.2668 1.67344 13.5251 1.74375 13.7585 1.81406C14.2918 1.97344 14.6085 2.59219 14.4668 3.19219C14.3252 3.79219 13.7752 4.14844 13.2418 3.98906C12.7876 3.85312 12.3626 3.75937 11.9835 3.75469C11.6793 3.75 11.371 3.83437 11.1751 3.96094C11.0876 4.02187 11.046 4.07344 11.0293 4.10156C11.0168 4.125 11.0001 4.15781 11.0001 4.23281V4.26094C11.0085 4.27031 11.0376 4.31719 11.1376 4.38281C11.3793 4.54688 11.7376 4.67344 12.2793 4.85625L12.3168 4.87031C12.7793 5.025 13.396 5.23594 13.896 5.5875C14.4668 5.99062 14.9835 6.66094 14.996 7.69219C15.0085 8.74688 14.521 9.51563 13.8835 9.96563C13.6043 10.1578 13.3043 10.2937 12.996 10.3781V10.875C12.996 11.4984 12.5501 12 11.996 12C11.4418 12 10.996 11.4984 10.996 10.875V10.3406C10.6001 10.2328 10.2376 10.0922 9.92928 9.975C9.84177 9.94219 9.75844 9.90938 9.67927 9.88125C9.15427 9.68438 8.87093 9.04687 9.04593 8.45625C9.22093 7.86562 9.78761 7.54687 10.3126 7.74375C10.4209 7.78594 10.5209 7.82344 10.6168 7.86094C11.1835 8.07656 11.5918 8.23125 12.0293 8.25C12.3626 8.26406 12.6585 8.175 12.8293 8.05781C12.9085 8.00156 12.946 7.95469 12.9626 7.92188C12.9793 7.89375 13.0001 7.8375 12.996 7.72969V7.72031C12.996 7.67344 12.996 7.62188 12.8293 7.50469C12.5918 7.33594 12.2335 7.20469 11.7001 7.02188L11.621 6.99375C11.171 6.84375 10.5793 6.64219 10.1043 6.31875C9.54177 5.93906 9.0001 5.2875 8.99593 4.25156C8.99176 3.17812 9.53344 2.44219 10.1501 2.02969C10.4168 1.85156 10.7043 1.72969 10.9918 1.64531V1.125C10.9918 0.501562 11.4376 0 11.9918 0C12.546 0 12.9918 0.501562 12.9918 1.125H13.0001ZM23.6753 15.7641C24.2211 16.5984 24.0628 17.7703 23.3211 18.3844L18.046 22.7578C17.071 23.5641 15.896 24 14.6835 24H1.33335C0.59584 24 0 23.3297 0 22.5V19.5C0 18.6703 0.59584 18 1.33335 18H2.8667L4.73755 16.3125C5.6834 15.4594 6.85841 15 8.07092 15H14.6668C15.4043 15 16.0002 15.6703 16.0002 16.5C16.0002 17.3297 15.4043 18 14.6668 18H11.3335C10.9668 18 10.6668 18.3375 10.6668 18.75C10.6668 19.1625 10.9668 19.5 11.3335 19.5H16.3585L21.3461 15.3656C22.0877 14.7516 23.1294 14.9297 23.6753 15.7641Z" fill="white" />
        </svg>
    </span>
}

function Tracking() {
    return <span className='inline-block p-5 rounded-full bg-[black]'>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.1537 5.61536H7.46139C6.44179 5.61536 5.61523 6.44191 5.61523 7.46151V11.1538C5.61523 12.1734 6.44179 13 7.46139 13H11.1537C12.1733 13 12.9998 12.1734 12.9998 11.1538V7.46151C12.9998 6.44191 12.1733 5.61536 11.1537 5.61536Z" stroke="#FFF7F7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5.61538 1H2.84615C2.35652 1 1.88695 1.1945 1.54073 1.54073C1.1945 1.88695 1 2.35652 1 2.84615V5.61538M20.3846 1H23.1538C23.6435 1 24.1131 1.1945 24.4593 1.54073C24.8055 1.88695 25 2.35652 25 2.84615V5.61538M5.61538 25H2.84615C2.35652 25 1.88695 24.8055 1.54073 24.4593C1.1945 24.1131 1 23.6435 1 23.1538V20.3846M20.3846 25H23.1538C23.6435 25 24.1131 24.8055 24.4593 24.4593C24.8055 24.1131 25 23.6435 25 23.1538V20.3846M5.61538 17.6154V20.3846H8.38462M13 20.3846V17.6154H10.2308M20.3846 8.38462H17.6154V5.61538M20.3846 14.8462V12.0769H17.6154M17.6154 17.6154V20.3846H20.3846" stroke="#FFF7F7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </span>
}
function Nosotros() {
    return <span className='inline-block p-5 rounded-full bg-[black]'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.8 8.4H13.2V6H10.8M12 21.6C6.708 21.6 2.4 17.292 2.4 12C2.4 6.708 6.708 2.4 12 2.4C17.292 2.4 21.6 6.708 21.6 12C21.6 17.292 17.292 21.6 12 21.6ZM12 0C10.4241 0 8.86371 0.310389 7.4078 0.913446C5.95189 1.5165 4.62902 2.40042 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C4.62902 21.5996 5.95189 22.4835 7.4078 23.0866C8.86371 23.6896 10.4241 24 12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 10.4241 23.6896 8.86371 23.0866 7.4078C22.4835 5.95189 21.5996 4.62902 20.4853 3.51472C19.371 2.40042 18.0481 1.5165 16.5922 0.913446C15.1363 0.310389 13.5759 0 12 0ZM10.8 18H13.2V10.8H10.8V18Z" fill="white" />
        </svg>
    </span>
}
function Politicas() {
    return <span className='inline-block p-5 rounded-full bg-[black]'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.6795 4.6071C23.5726 4.50347 23.4416 4.41968 23.2947 4.36098C23.1479 4.30228 22.9883 4.26993 22.8261 4.26596C20.3053 4.21003 17.1156 1.9227 15.0067 1.02511C13.704 0.472381 12.844 0.107936 12.1982 0.011932C12.067 -0.00428385 11.9338 -0.00396976 11.8027 0.0128641C11.1569 0.108869 10.2969 0.473313 8.99529 1.02604C6.8864 1.9227 3.69671 4.21003 1.17593 4.26596C1.01356 4.27014 0.853924 4.30257 0.70693 4.36125C0.559936 4.41994 0.428711 4.50361 0.32139 4.6071C0.0989386 4.82067 -0.015835 5.09981 0.00176175 5.38445C0.543262 14.7267 4.49193 20.5084 11.4205 23.8686C11.6006 23.9553 11.8005 24 11.9993 24C12.1982 24 12.3981 23.9553 12.5793 23.8686C19.5079 20.5084 23.4554 14.7267 23.998 5.38445C24.0167 5.09985 23.9022 4.8205 23.6795 4.6071ZM18.17 8.28137L12.3234 15.6029C12.1136 15.8657 11.7841 16.04 11.4578 16.04C11.1305 16.04 10.767 15.8881 10.5374 15.6933L6.41629 12.1952C6.28174 12.0806 6.2062 11.9254 6.2062 11.7636C6.2062 11.6019 6.28174 11.4467 6.41629 11.3321L7.43449 10.4662C7.56982 10.3524 7.75258 10.2886 7.94304 10.2886C8.1335 10.2886 8.31626 10.3524 8.45159 10.4662L11.1316 12.7404L15.7877 6.90841C15.8954 6.77495 16.061 6.68309 16.2482 6.65287C16.4355 6.62266 16.6293 6.65656 16.7872 6.74716L17.9789 7.43317C18.1364 7.52444 18.2448 7.66489 18.2807 7.82381C18.3165 7.98274 18.2767 8.14724 18.17 8.28137Z" fill="white" />
        </svg>
    </span>
}

function Logout() {
    return <span className='inline-block p-5 rounded-full bg-[black]'>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4.46155C7.58354 4.69325 7.18286 4.94834 6.8 5.22494C6.14474 5.69829 5.54152 6.23472 5 6.82475C3.13291 8.85927 2 11.5318 2 14.4588C2 20.8328 7.37259 26 14 26C20.6274 26 26 20.8328 26 14.4588C26 11.5318 24.8671 8.85927 23 6.82475C22.4585 6.23472 21.8553 5.69829 21.2 5.22494C20.8171 4.94834 20.4165 4.69325 20 4.46155" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14 2V14.3077" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </span>

}
export default function Navbar({ children }) {
    const { user, userDB, setUserProfile, nav, setNav, userNav, navItem, setNavItem, setUserNav, state, setState, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, divisas, setDivisas, setCountries } = useUser()

    const router = useRouter()

    function handlerNavItem(item) {
        navItem === item
            ? setNavItem('')
            : setNavItem(item)
    }

    const signOutHandler = () => {
        handleSignOut()
        router.push('/')
        setUserProfile(null)
        setNav(false)
    }


    return (
        <>
            <nav className="w-screen fixed top-0 z-40 " >
                <div className="absolute top-0 w-screen  h-[70px]" style={{
                    backgroundImage: 'url(/background.png)',
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center ',
                    backgroundSize: 'cover',
                }}>
                    <div className="absolute top-0 w-screen  flex flex-wrap items-center justify-between mx-auto p-[10px] z-50" style={{
                        backgroundImage: 'linear-gradient(#000000c7, #000000c7)',
                    }}>
                        <a className="flex items-center">
                            <img src="/logo.svg" className="h-[50px]" alt="Flowbite Logo" />
                        </a>

                        <div className='pt-[10px]'>

                            {user !== null && user !== undefined
                                ? <button type="button" className="inline-flex items-center text-gray-100 ml-4 sm:hidden" onClick={() => setNav(!nav)}>
                                    <span className="sr-only">Open menu</span>
                                    <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 13.2C15.5313 13.2 15.9769 13.0848 16.3369 12.8544C16.6969 12.624 16.8762 12.3392 16.875 12V8.4C16.875 8.06 16.695 7.7748 16.335 7.5444C15.975 7.314 15.53 7.1992 15 7.2C14.4688 7.2 14.0231 7.3152 13.6631 7.5456C13.3031 7.776 13.1238 8.0608 13.125 8.4V12C13.125 12.34 13.305 12.6252 13.665 12.8556C14.025 13.086 14.47 13.2008 15 13.2ZM15 16.8C15.5313 16.8 15.9769 16.6848 16.3369 16.4544C16.6969 16.224 16.8762 15.9392 16.875 15.6C16.875 15.26 16.695 14.9748 16.335 14.7444C15.975 14.514 15.53 14.3992 15 14.4C14.4688 14.4 14.0231 14.5152 13.6631 14.7456C13.3031 14.976 13.1238 15.2608 13.125 15.6C13.125 15.94 13.305 16.2252 13.665 16.4556C14.025 16.686 14.47 16.8008 15 16.8ZM1.87501 20.4C1.34376 20.4 0.898131 20.2848 0.538132 20.0544C0.178132 19.824 -0.00124351 19.5392 6.48787e-06 19.2C6.48787e-06 18.86 0.180007 18.5748 0.540006 18.3444C0.900006 18.114 1.34501 17.9992 1.87501 18H3.75001V9.6C3.75001 7.94 4.53125 6.4648 6.09375 5.1744C7.65625 3.884 9.6875 3.0392 12.1875 2.64V1.8C12.1875 1.3 12.4613 0.874803 13.0087 0.524403C13.5562 0.174003 14.22 -0.000797266 15 2.73348e-06C15.7813 2.73348e-06 16.4456 0.175203 16.9931 0.525603C17.5406 0.876002 17.8137 1.3008 17.8125 1.8V2.64C20.3125 3.04 22.3437 3.8852 23.9062 5.1756C25.4687 6.466 26.25 7.9408 26.25 9.6V18H28.125C28.6562 18 29.1019 18.1152 29.4619 18.3456C29.8219 18.576 30.0012 18.8608 30 19.2C30 19.54 29.82 19.8252 29.46 20.0556C29.1 20.286 28.655 20.4008 28.125 20.4H1.87501ZM15 24C13.9688 24 13.0856 23.7648 12.3506 23.2944C11.6156 22.824 11.2488 22.2592 11.25 21.6H18.75C18.75 22.26 18.3825 22.8252 17.6475 23.2956C16.9125 23.766 16.03 24.0008 15 24Z" fill="white" />
                                    </svg>
                                </button>
                                : ''
                            }



                            <button type="button" className="inline-flex items-center text-gray-100 ml-4 sm:hidden" onClick={() => setNav(!nav)}>
                                <span className="sr-only">Open menu</span>
                                <svg width="30" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 22H32M2 12H32M2 2H32" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <ul className={`absolute top-0 pt-[60px]  w-[100vw]  sm:max-w-[350px] transition-all	z-20 px-[30px]  sm:flex  sm:items-center sm:justify-between sm:h-auto sm:min-h-auto sm:pt-[10px] sm:z-50  ${nav ? 'left-0 ' : 'left-[-100vw] sm:left-auto sm:right-[10px]'}`} >

                {userDB && userDB.rol && (userDB.rol === 'Admin' || userDB.rol === 'Cliente') && <li onClick={() => handlerNavItem('Mi cuenta')}>
                    <h3 className='text-[12px] text-white py-5 cursor-pointer'>MI CUENTA</h3>
                    <div className={`relative sm:absolute sm:top-[90px] sm:right-[20px] sm:w-[350px]  sm:bg-blue-950  grid grid-cols-2 gap-[20px]  rounded-2xl z-20  ${navItem === 'Mi cuenta' ? 'h-auto p-[20px]' : 'h-auto sm:h-0 sm:overflow-hidden'}`}>
                        {userDB && userDB.rol && userDB.rol === 'Admin' &&
                            <Link href="/Admin" className="flex flex-col justify-between items-center bg-[#FFF500]   py-2 pl-3 pr-4  rounded   sm:hover:text-yellow-300" onClick={() => setNav(false)}>
                                Admin
                            </Link>
                        }
                        {userDB && userDB.rol && userDB.rol === 'Cliente' && <>
                            <Link href="/Cliente" className="flex flex-col justify-between items-center bg-[#FFF500]   py-2 pl-3 pr-4  rounded   sm:hover:text-yellow-300 " onClick={() => setNav(false)}>
                                Perfil
                            </Link>
                            <Link href="/Tracking" className="flex flex-col justify-between items-center bg-[#FFF500]   py-2 pl-3 pr-4  rounded    sm:hover:text-yellow-300 " onClick={() => setNav(false)}>
                                <Historial />
                                Mis Transacciones
                            </Link>
                            {user !== null && user !== undefined
                                ? <button className="flex flex-col justify-between items-center bg-[#FFF500]   py-2 pl-3 pr-4  rounded hover:bg-gray-100 sm:hover:bg-transparent sm:hover:text-yellow-300" onClick={signOutHandler}>
                                    <Logout />
                                    Cerrar sesión
                                </button>
                                : <Link href="/Login" className="flex flex-col justify-between items-center bg-[#FFF500]   py-2 pl-3 pr-4  rounded hover:bg-gray-100 sm:hover:bg-transparent sm:hover:text-yellow-300" onClick={() => setNav(false)}>
                                    <Logout />
                                    Iniciar Sesión
                                </Link>
                            }
                        </>}
                    </div>
                </li>}

                <li onClick={() => handlerNavItem('Servicios')}>
                    <h3 className='text-[12px] text-white py-5 cursor-pointer'>SERVICIOS</h3>
                    <div className={`relative sm:absolute sm:top-[90px] sm:right-[20px] sm:w-[350px]  sm:bg-blue-950  grid grid-cols-2 gap-[20px]  rounded-2xl z-20  ${navItem === 'Servicios' ? 'h-auto p-[20px]' : 'h-auto sm:h-0 sm:overflow-hidden'}`}>
                        <Link href="/" className="flex flex-col justify-between items-center bg-[#FFF500]   py-2 pl-3 pr-4  rounded  sm:hover:text-yellow-300" onClick={() => setNav(false)}>
                            <Remesas />
                            Remesas
                        </Link>
                        <Link href="/Cambios" className="flex flex-col justify-between items-center bg-[#FFF500]   py-2 pl-3 pr-4  rounded    sm:hover:text-yellow-300" onClick={() => setNav(false)}>
                            <Cambios />
                            Cambios
                        </Link>
                        <Link href="/Cambios" className="flex flex-col justify-between items-center bg-[#FFF500]   py-2 pl-3 pr-4  rounded    sm:hover:text-yellow-300" onClick={() => setNav(false)}>
                            Tarifas y comisiones
                        </Link>
                        <Link href="/Tracking" className="flex flex-col justify-between items-center bg-[#FFF500]   py-2 pl-3 pr-4  rounded    sm:hover:text-yellow-300 lg:hidden" onClick={() => setNav(false)}>
                            <Tracking />
                            Tracking
                        </Link>
                    </div>
                </li>

                <li onClick={() => handlerNavItem('Acerca')}>
                    <h3 className='text-[12px] text-white py-5 cursor-pointer'>ACERCA DE</h3>
                    <div className={`relative sm:absolute sm:top-[90px] sm:right-[20px] sm:w-[350px]  sm:bg-blue-950  grid grid-cols-2 gap-[20px]  rounded-2xl z-20   ${navItem === 'Acerca' ? 'h-auto p-[20px]' : 'h-auto sm:h-0 sm:overflow-hidden'}`}>
                        <Link href="#" className="flex flex-col justify-between items-center bg-[#FFF500]   py-2 pl-3 pr-4  rounded    sm:hover:text-yellow-300" onClick={() => setNav(false)}>
                            <Nosotros />
                            Nosotros
                        </Link>
                        <Link href="#" className="flex flex-col justify-between items-center bg-[#FFF500]   py-2 pl-3 pr-4  rounded hover:bg-gray-100 sm:hover:bg-transparent sm:hover:text-yellow-300" onClick={() => setNav(false)}>
                            <Politicas />
                            Politicas
                        </Link>
                    </div>
                </li>

                <li className='hidden sm:inline-block'>
                    {user !== null && user !== undefined
                        ? <button type="button" className=" items-center text-gray-100 ml-4 inline-flex " onClick={() => setNav(!nav)}>
                        <span className="sr-only">Open menu</span>
                        <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 13.2C15.5313 13.2 15.9769 13.0848 16.3369 12.8544C16.6969 12.624 16.8762 12.3392 16.875 12V8.4C16.875 8.06 16.695 7.7748 16.335 7.5444C15.975 7.314 15.53 7.1992 15 7.2C14.4688 7.2 14.0231 7.3152 13.6631 7.5456C13.3031 7.776 13.1238 8.0608 13.125 8.4V12C13.125 12.34 13.305 12.6252 13.665 12.8556C14.025 13.086 14.47 13.2008 15 13.2ZM15 16.8C15.5313 16.8 15.9769 16.6848 16.3369 16.4544C16.6969 16.224 16.8762 15.9392 16.875 15.6C16.875 15.26 16.695 14.9748 16.335 14.7444C15.975 14.514 15.53 14.3992 15 14.4C14.4688 14.4 14.0231 14.5152 13.6631 14.7456C13.3031 14.976 13.1238 15.2608 13.125 15.6C13.125 15.94 13.305 16.2252 13.665 16.4556C14.025 16.686 14.47 16.8008 15 16.8ZM1.87501 20.4C1.34376 20.4 0.898131 20.2848 0.538132 20.0544C0.178132 19.824 -0.00124351 19.5392 6.48787e-06 19.2C6.48787e-06 18.86 0.180007 18.5748 0.540006 18.3444C0.900006 18.114 1.34501 17.9992 1.87501 18H3.75001V9.6C3.75001 7.94 4.53125 6.4648 6.09375 5.1744C7.65625 3.884 9.6875 3.0392 12.1875 2.64V1.8C12.1875 1.3 12.4613 0.874803 13.0087 0.524403C13.5562 0.174003 14.22 -0.000797266 15 2.73348e-06C15.7813 2.73348e-06 16.4456 0.175203 16.9931 0.525603C17.5406 0.876002 17.8137 1.3008 17.8125 1.8V2.64C20.3125 3.04 22.3437 3.8852 23.9062 5.1756C25.4687 6.466 26.25 7.9408 26.25 9.6V18H28.125C28.6562 18 29.1019 18.1152 29.4619 18.3456C29.8219 18.576 30.0012 18.8608 30 19.2C30 19.54 29.82 19.8252 29.46 20.0556C29.1 20.286 28.655 20.4008 28.125 20.4H1.87501ZM15 24C13.9688 24 13.0856 23.7648 12.3506 23.2944C11.6156 22.824 11.2488 22.2592 11.25 21.6H18.75C18.75 22.26 18.3825 22.8252 17.6475 23.2956C16.9125 23.766 16.03 24.0008 15 24Z" fill="white" />
                        </svg>
                    </button>
                        : <Link href="/Login" className="flex flex-col justify-between items-center bg-[#FFF500]   py-2 pl-3 pr-4  rounded hover:bg-gray-100 sm:hover:bg-transparent sm:hover:text-yellow-300" onClick={() => setNav(false)}>
                            Iniciar Sesión
                        </Link>
                    }
                </li>
                
            </ul>
        </>
    )
}

{/* <button type="button" className="inline-flex items-center text-gray-100  ml-4" onClick={() => setUserNav(!userNav)}>
    <span className="sr-only">Open menu</span>
    <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0C16.9891 0 18.8968 0.632141 20.3033 1.75736C21.7098 2.88258 22.5 4.4087 22.5 6C22.5 7.5913 21.7098 9.11742 20.3033 10.2426C18.8968 11.3679 16.9891 12 15 12C13.0109 12 11.1032 11.3679 9.6967 10.2426C8.29018 9.11742 7.5 7.5913 7.5 6C7.5 4.4087 8.29018 2.88258 9.6967 1.75736C11.1032 0.632141 13.0109 0 15 0ZM15 15C23.2875 15 30 17.685 30 21V24H0V21C0 17.685 6.7125 15 15 15Z" fill="white" />
    </svg>
</button>  */}



// <div className={`relative sm:absolute h-[125px] top-0 pt-[70px]  grid grid-cols-3 gap-5  w-[100vw]   transition-all	z-20 px-[10px]  ${userNav ? 'top-0 ' : 'top-[-100vw]'}`} >
// <Tag theme='Primary'>Historial</Tag>  <Tag theme='Primary'>Historial</Tag>   <Tag theme='Primary'>Historial</Tag>
// </div>


// <div className={`relative sm:absolute  top-0 pt-[3px] items-center justify-between   transition-all	z-50  hidden lg:flex  right-[100px]`} >
// <ul className="flex bg-transparent p- mt-4 font-regular text-[14px]">
//     <li>
//         <Link href="/" className="flex flex-col justify-between items-center bg-[#FFF500]   py-2 pl-3 pr-4  rounded  sm:hover:text-yellow-300" onClick={() => setNav(false)}>Remesas</Link>
//     </li>
//     <li>
//         <Link href="/Cambios" className="flex flex-col justify-between items-center bg-[#FFF500]   py-2 pl-3 pr-4  rounded    sm:hover:text-yellow-300" onClick={() => setNav(false)}>Cambios</Link>
//     </li>
//     {userDB && userDB.rol && userDB.rol === 'Cliente' &&
//         <li>
//             <Link href="/Tracking" className="flex flex-col justify-between items-center bg-[#FFF500]   py-2 pl-3 pr-4  rounded    sm:hover:text-yellow-300 " onClick={() => setNav(false)}>Mis Transacciones</Link>
//         </li>}
//     <li>
//         <Link href="/Tracking" className="flex flex-col justify-between items-center bg-[#FFF500]   py-2 pl-3 pr-4  rounded    sm:hover:text-yellow-300" onClick={() => setNav(false)}>Tracking</Link>
//     </li>
// </ul>
// </div> 