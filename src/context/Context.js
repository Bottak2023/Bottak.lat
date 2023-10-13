'use client'

import React, { useState, useMemo, useContext } from 'react'

const UserContext = React.createContext()

export function UserProvider({ children }) {

	const [user, setUser] = useState(undefined)
	const [users, setUsers] = useState(undefined)
	const [userDB, setUserDB] = useState(undefined)

	const [divisas, setDivisas] = useState(undefined)
	const [envios, setEnvios] = useState(undefined)
	const [exchange, setExchange] = useState({})

	const [success, setSuccess] = useState(null)
	const [state, setState] = useState('Remesas')
	const [nav, setNav] = useState(false)
	const [modal, setModal] = useState('modal')
	const [currency, setCurrency] = useState("BOL");
	const [select, setSelect] = useState('BOL')
	const [select2, setSelect2] = useState('USA')
	const [select3, setSelect3] = useState('USA')

	const [isSelect, setIsSelect] = useState(false)
	const [isSelect2, setIsSelect2] = useState(false)
	const [isSelect3, setIsSelect3] = useState(false)

	const [webScann, setWebScann] = useState(null)
	const [filter, setFilter] = useState(null)
	const [filterQR, setFilterQR] = useState(null)


	const [transferencia, setTransferencia] = useState('')
	const [destinatario, setDestinatario] = useState({})
	const [item, setItem] = useState(null)
	const [qr, setQr,] = useState(null)
	const [QRurl, setQRurl,] = useState(null)

	const [fecha, setFecha] = useState(null)

	const [image1, setImage1] = useState(null)
	const [image2, setImage2] = useState(null)
	const [image3, setImage3] = useState(null)

	const webcamRef1 = React.useRef(null);
	const webcamRef2 = React.useRef(null);
	const webcamRef3 = React.useRef(null);



	const setUserProfile = (data) => {
		setUser(data)
	}

	const setUserData = (data) => {
		setUserDB(data)
	}

	const setUserSuccess = (data) => {

		if (success === null) {
			setSuccess(data)
			const timer = setTimeout(() => {
				setSuccess(null)
				console.log('timer')
				return clearTimeout(timer)
			}, 6000)
		
		}

	}

	const value = useMemo(() => {
		return ({
			user,
			userDB,
			success,
			state,
			nav,
			modal,
			transferencia,
			currency,
			select,
			users,
			destinatario,
			image1, setImage1, image2, setImage2, image3, setImage3,
			webcamRef1, item, setItem,
			webcamRef2,
			webcamRef3,

			exchange, setExchange,
			webScann, setWebScann,
			filter, setFilter,
			filterQR, setFilterQR,
			envios, setEnvios,
			divisas, setDivisas,
			select2, setSelect2,
			isSelect, setIsSelect,
			isSelect2, setIsSelect2,
			isSelect3, setIsSelect3,
			fecha, qr, setQr, QRurl, 
			select3, setSelect3,
			setQRurl, 

			setDestinatario,
			setUsers,
			setSelect,
			setCurrency,
			setTransferencia,
			setModal,
			setNav,
			setState,
			setUserProfile,
			setUserData,
			setUserSuccess

		})

	}, [user, userDB, success, state, nav, modal, transferencia, currency, select, select2, select3, isSelect, isSelect2, isSelect3, users, destinatario, image1, image2, image3, item, webcamRef1,
		webcamRef2,
		webcamRef3,
		fecha, qr, QRurl, divisas, envios,
		webScann,
		filter,
		filterQR, exchange])


	return (
		<UserContext.Provider value={value} >
			{children}
		</UserContext.Provider>
	)
}

export function useUser() {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error('error')
	}
	return context
}
