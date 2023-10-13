'use client';


export default function Button({children}) {

    return (
<<<<<<< HEAD
        <div class="fixed top-[70px] w-[90%] max-w-[500px] flex p-4 mb-4 text-sm text-red-800 border border-red-400 rounded-full rounded-tr-none bg-white " role="alert">
=======
        <div class="fixed top-[65px] w-screen flex p-4 mb-4 text-sm text-red-800 border border-red-400 rounded-lg bg-slate-300 " role="alert">
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <span class="sr-only">Info</span>
            <div>
               {children}
            </div>
        </div>
    )
}