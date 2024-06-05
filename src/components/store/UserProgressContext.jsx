import { createContext, useState } from 'react'

const UserProgressContext = createContext({
	progress: '',
	showLogin: () => {},
	hideLogin: () => {},
	showRegister: () => {},
	hideRegister: () => {},
	handleLogin: () => {},
	status: false,
	handleLogout: () => {},
})

export function UserProgressContextProvider({ children }) {
	const [userProgress, setUserProgress] = useState()
	const [isLogged, setIsLogged] = useState(false)

	function showLogin() {
		setUserProgress('login')
	}
	function hideLogin() {
		setUserProgress('')
	}

	function showRegister() {
		setUserProgress('register')
	}
	function hideRegister() {
		setUserProgress('')
	}

	function handleLogin() {
		setIsLogged(true)
	}

	function handleLogout() {
		setIsLogged(false)
	}

	console.log(isLogged)

	const userProgressCtx = {
		progress: userProgress,
		status: isLogged,
		showLogin,
		hideLogin,
		showRegister,
		hideRegister,
		handleLogin,
		handleLogout,
	}

	return <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
}

export default UserProgressContext
