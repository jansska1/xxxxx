import { useContext, useState } from 'react'
import UserDataContext from './store/UserDataContext'
import UserProgressContext from './store/UserProgressContext'
import Button from './UI/Button'
import Saldo from './Saldo'

export default function Logged() {
	const [user, setUser] = useState('')
	const registerDataCtx = useContext(UserDataContext)
	const userProgressCtx = useContext(UserProgressContext)

	const userData = registerDataCtx.data.find(item => item.pesel === registerDataCtx.loginData.pesel)

	function handleLogout() {
		userProgressCtx.handleLogout()
		registerDataCtx.handleLogout()
	}

	function handleUserHistory() {
		setUser('history')
	}
	function handleUserSaldo() {
		setUser('saldo')
	}
	function handleUserData() {
		setUser('userData')
	}

	let site = <Saldo userData={userData} />

	if (user === 'history') {
		site = <p>history</p>
	} else if (user === 'saldo') {
		site = <Saldo userData={userData} />
	} else if (user === 'userData') {
		site = <p>dane</p>
	}

	return (
		<section className='bg-gray-950 h-screen text-white'>
			<header className='bg-rose-600 flex justify-between'>
				<div className='w-full flex justify-end items-center md:m-auto md:max-w-screen-xl gap-4 p-2 bg-rose-600'>
					<Button
						onClick={handleUserSaldo}
						className='text-gray-950 border-b border-gray-950 text-base p-4'>
						Saldo
					</Button>
					<Button
						onClick={handleUserHistory}
						className='text-gray-950 border-b border-gray-950 text-base p-4'>
						Historia
					</Button>
					<div className='dropdown'>
						<button className='dropbtn bg-rose-600 text-gray-950 '>UŻYTKOWNIK</button>
						<div className='dropdown-content'>
							<ul>
								<li>
									<Button onClick={handleUserData}>Dane</Button>
								</li>
								<li>
									<Button
										onClick={handleLogout}
										className=''>
										Wyloguj się
									</Button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</header>

			{site}
		</section>
	)
}
