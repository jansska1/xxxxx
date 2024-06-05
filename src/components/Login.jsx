import { useContext, useState, useRef } from 'react'
import Modal from './UI/Modal'
import Button from './UI/Button'
import Input from './UI/Input'
import UserProgressContext from './store/UserProgressContext'
import UserDataContext from './store/UserDataContext'
import { fetchAvailableUsers } from '../http'
// import useHttp from './hooks/useHttp'

let registeredData

export default function Login() {
	const [error, setError] = useState({ passes: false, input: false })
	const [isFetching, setIsFetching] = useState(false)
	const [user, setUser] = useState([])
	const [fetchErorr, setFetchError] = useState()

	const userProgressCtx = useContext(UserProgressContext)
	const registerDataCtx = useContext(UserDataContext)

	const reset = useRef()

	if (registerDataCtx.status) {
		registeredData = registerDataCtx.data
	}

	function closeLogin() {
		userProgressCtx.hideLogin()
		if (error) {
			setError(prevError => ({
				...prevError,
				passes: false,
				input: false,
			}))
		}
		reset.current.reset()
	}

	function logIn() {
		userProgressCtx.handleLogin()
	}

	function handleSubmit(e) {
		e.preventDefault()
		const fd = new FormData(e.target)
		const data = Object.fromEntries(fd.entries())

		const hasEmptyFields = Object.values(data).some(value => value.trim() === '')

		setError(prevError => ({
			...prevError,
			input: hasEmptyFields,
		}))

		if (hasEmptyFields) {
			return
		}

		// if (registerDataCtx.status) {
		// 	if (registerDataCtx.data.some(item => item.pesel === data.pesel && item.password === data.password)) {
		// 		setError(prevError => ({
		// 			...prevError,
		// 			passes: false,
		// 		}))
		// 		logIn()
		// 		console.log('zalogowano')
		// 	} else {
		// 		setError(prevError => ({
		// 			...prevError,
		// 			passes: true,
		// 		}))
		// 		console.log('błędne dane')
		// 		return
		// 	}
		// }

		if (!registerDataCtx.status) {
			setError(prevError => ({
				...prevError,
				passes: true,
			}))
			return
		}

		async function fetchUser() {
			setIsFetching(true)
			try {
				const user = await fetchAvailableUsers()
				setUser(user)
			} catch (error) {
				setError({ message: error.message || 'Could not fetch places, please try later' })
			}
			setIsFetching(false)
		}
		fetchUser()

		console.log(user)
		reset.current.reset()
	}

	return (
		<Modal
			open={userProgressCtx.progress === 'login'}
			onClose={closeLogin}
			className='backdrop:bg-stone-900/90 p-4 rounded-xl shadow-md bg-rose-600 md:w-96'>
			<form
				onSubmit={handleSubmit}
				ref={reset}
				className='p-2 '>
				<div className='flex flex-col gap-4 p-2 my-4'>
					<h3 className='text-center font-bold text-3xl mb-4'>NewChance</h3>
					<Input
						id='login-pesel'
						placeholder='PESEL'
						type='text'
						name='pesel'
						minLength='11'
						maxLength='11'
					/>
					<Input
						id='login-password'
						type='password'
						name='password'
						minLength='3'
						placeholder='Hasło'
						className="pl-5 bg-no-repeat bg-left bg-[url('./assets/lock.svg')] bg-[length:20px_20px]"
					/>
				</div>

				{error.passes && <p className='text-center'>niepoprawny login lub hasło</p>}
				{error.input && <p className='text-center'>uzupełnij wszystkie pola</p>}

				<div className='m-auto flex justify-between gap-4 items-center flex-col px-2 py-4'>
					<Button className='rounded-md font-bold bg-gray-950  border-transparent text-rose-600 px-4 py-3 hover:bg-gray-900 hover:transition-colors w-full'>
						Zaloguj się
					</Button>
					<Button
						className='font-bold'
						type='button'
						onClick={closeLogin}>
						Zamknij
					</Button>
				</div>
			</form>
		</Modal>
	)
}
