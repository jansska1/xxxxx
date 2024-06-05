import { useContext, useRef, useState } from 'react'
import Modal from './UI/Modal'
import Button from './UI/Button'
import Input from './UI/Input'
import UserProgressContext from './store/UserProgressContext'
import UserDataContext from './store/UserDataContext'
import useHttp from './hooks/useHttp'

const h3 = 'uppercase py-2 font-bold'
const button = 'py-2 px-4 border rounded border-rose-600 font-inherit'
const registerInput = 'my-1'
let registeredData

const requestConfig = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
}

export default function Register() {
	const [isEmpty, setIsEmpty] = useState()
	const [registered, setIsRegistered] = useState(false)
	const {
		data,
		isLoading: isSending,
		error,
		sendRequest,
		clearData,
	} = useHttp('http://192.168.56.1:8080/client', requestConfig)

	const userProgressCtx = useContext(UserProgressContext)
	const registerDataCtx = useContext(UserDataContext)

	const reset = useRef()

	const modalContent = document.getElementById('register-modal')

	if (registerDataCtx.status) {
		registeredData = registerDataCtx.data
	}

	function closeRegister() {
		userProgressCtx.hideRegister()
		reset.current.reset()
		if (userProgressCtx.progress === 'register') {
			modalContent.scrollTop = 0
		}
		clearData()
	}

	function handleShowLogin() {
		userProgressCtx.showLogin()
		setIsRegistered(false)
	}

	function handleSubmit(e) {
		e.preventDefault()
		const fd = new FormData(e.target)
		const data = Object.fromEntries(fd.entries())

		const hasEmptyFields = Object.values(data).some(value => value.trim() === '')

		setIsEmpty(hasEmptyFields)

		if (hasEmptyFields) {
			return
		}

		if (registerDataCtx.status) {
			if (registeredData.length > 0) {
				for (let i = 0; i < registeredData.length; i++) {
					if (data.pesel === registeredData[i].pesel) {
						console.log('konto już istnieje')
						return
					}
				}
			}
		}

		sendRequest(JSON.stringify(data))

		console.log(error)

		registerDataCtx.handleRegister(data)
		reset.current.reset()
		setIsRegistered(true)
	}

	let actions = (
		<>
			<Button
				className={button}
				type='button'
				onClick={closeRegister}>
				Zamknij
			</Button>
			<Button
				className='rounded-md font-bold bg-gray-950  border-transparent text-rose-600 px-4 py-3 hover:bg-gray-900 hover:transition-colors w-full'
				type='submit'>
				Otwórz konto
			</Button>
		</>
	)

	if (isSending) {
		actions = <span>Rejestrowanie...</span>
	}

	return (
		<>
		<Modal
			open={userProgressCtx.progress === 'register'}
			onClose={closeRegister}
			id='register-modal'
			className='backdrop:bg-stone-900/90 p-6 rounded-xl shadow-md  bg-rose-600 md:w-[26rem]'>
			<form
				noValidate
				ref={reset}
				onSubmit={handleSubmit}
				className='mt-4'>
				<h3 className='text-center font-bold text-3xl mb-4'>NewChance</h3>
				<div className='md:flex flex-row'>
					<div className='w-full'>
						<h3 className={h3}>dane</h3>
						<div className='flex flex-row gap-1'>
							<Input
								id='register-name'
								placeholder='Imię'
								type='text'
								name='name'
								className={registerInput}
								special='w-1/2'
							/>
							<Input
								id='second-name'
								placeholder='Nazwisko'
								type='text'
								name='secondName'
								className={registerInput}
								special='w-1/2'
							/>
						</div>
						<Input
							id='pesel'
							placeholder='PESEL'
							type='text'
							name='pesel'
							minLength='11'
							maxLength='11'
							className={registerInput}
						/>
						<h3 className={h3}>adres</h3>
						<Input
							id='city'
							placeholder='Miejscowość'
							type='text'
							name='city'
							className={registerInput}
						/>
						<div className='flex flex-row gap-1'>
							<Input
								id='street'
								placeholder='Ulica'
								type=''
								name='street'
								className={`${registerInput}`}
								special='w-2/3'
							/>
							<Input
								id='number'
								placeholder='Numer Domu / Mieszkania'
								type='number'
								name='number'
								className={`${registerInput}`}
								special='w-2/6'
							/>
						</div>
						<div className='w-full'>
							<h3 className={h3}>dane do logowania</h3>
							<Input
								id='register-password'
								placeholder='Hasło / min. 12 znaków'
								type='password'
								name='password'
								minLength='3'
								className={registerInput}
							/>
							{/* <Input
								id='register-confirm-password'
								placeholder='Powtórz Hasło'
								type='password'
								name='register-confirm-password'
								minLength='12'
								className={registerInput}
							/> */}
						</div>

						{isEmpty && <p>Uzupełnij wszystkie pola</p>}
						{/* {error && <p>{error}</p>} */}

						<div className='mt-6 flex gap-4 md:justify-start md:items-center md:flex-col-reverse w-full'>{actions}</div>
					</div>

					{/* <div className='w-full'></div> */}
				</div>

				{/* <div className='md:flex md:justify-between gap-6'> */}

				{/* </div> */}
			</form>
		</Modal>
		{registered && (
			<Modal
				open={userProgressCtx.progress === 'register'}
				onClose={userProgressCtx.progress === 'register' ? closeRegister : null}>
				<h2>Sukces</h2>
				<p>Konto zostało załóżone poprawnie.</p>
				{/* <p></p> */}
				<p>
					<Button onClick={handleShowLogin}>Okay</Button>
				</p>
			</Modal>
		)}
		</>
	)
}
