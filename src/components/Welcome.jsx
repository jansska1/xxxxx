import { useContext } from 'react'
import UserProgressContext from './store/UserProgressContext'
import Button from './UI/Button'
import Body from './Body'
const buttons =
	'rounded-xl text-rose-600 border border-rose-600 px-4 py-3 hover:bg-rose-600 hover:border-transparent hover:text-gray-900 hover:transition-colors'

export default function Welcome() {
	const userProgressCtx = useContext(UserProgressContext)

	function openLogin() {
		userProgressCtx.showLogin()
	}

	function openRegister() {
		userProgressCtx.showRegister()
	}

	return (
		<>
			<section className='bg-hero-pattern h-screen z-0'>
				<header className='w-full border-b border-rose-600 p-2 z-10 absolute'>
					<div className='flex justify-between max-w-7xl p-2'>
						<h1 className='font-bold p-2'>LOGO</h1>
						<div className='flex gap-3'>
							<Button
								className={buttons}
								onClick={openLogin}>
								Zaloguj się
							</Button>
							<Button
								onClick={openRegister}
								className={buttons}>
								Otwórz konto
							</Button>
						</div>
					</div>
				</header>
				<Body />
			</section>
		</>
	)
}
