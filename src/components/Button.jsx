'use client'; 
import style from '@/app/(layout)/style.module.css'

export default function Button({ theme, styled, click, children }) {


    switch (theme) {
        case 'Transparent':
            return <button
                type="submit"
                className=" bg-transparent border-[1px] border-gray-50 text-white  hover:bg-transparent hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm                                                                                                                       w-[100%] max-w-[350px] px-5 py-3 text-center"
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {children}
            </button>
            break
        case 'Primary':
            return <button
                type="submit"
<<<<<<< HEAD
                className={`hover:bg-gray-950 border-[1px] border-gray-50  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm  w-[100%] max-w-[380px] px-5 py-3 text-center ${style.buttonPrimary}`} 
=======
                className={`hover:bg-gray-950 border-[1px] border-gray-50  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm  w-[100%] max-w-[350px] px-5 py-3 text-center ${style.buttonPrimary}`} 
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {children}
            </button>
            break
        case 'Secondary':
            return <button
                type="submit"
                className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm w-full sm:w-[250px] px-5 py-3 text-center"
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {children}
            </button>

        case 'Success':
            return <button
                type="submit"
<<<<<<< HEAD
                className="text-white bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-[150px] py-2 text-center"
=======
                className="text-white bg-[#1e8647] hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm w-full sm:w-[250px] px-5 py-3 text-center"
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
                // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={click}
            >
                {children}
            </button>
<<<<<<< HEAD
            case 'Disable':
                return <button
                    type="submit"
                    className={`bg-transparent text-gray-400 border-[1px] border-gray-400 font-medium rounded-full text-sm  sm:w-[150px] p-2 text-center`} 
                    // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                    // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={click}
                >
                    {children}
                </button>
            case 'Danger':
                return <button
                    type="submit"
                    className="text-white bg-[red] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-[150px]  p-2 text-center"
=======
            case 'Danger':
                return <button
                    type="submit"
                    className="text-white bg-[red] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm w-full sm:w-[250px] px-5 py-3 text-center"
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
                    // className="text-white bg-violet-700 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                    // dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={click}
                >
                    {children}
                </button>
        default:
           
    }
}