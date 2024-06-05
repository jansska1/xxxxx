import { createContext, useState } from 'react'

const UserDataContext = createContext({
	status: false,
	data: [],
	handleRegister: () => {},
	handleLogin: () => {},
	loginData: {},
	handleLogout: () => {},
	balance: 0,
})

export function UserDataContextProvider({ children }) {
	const [register, setRegister] = useState({ accepted: false, data: [] })
	const [login, setLogin] = useState({})

	function handleRegister(value) {
		setRegister(prevValue => {
			return {
				...prevValue,
				accepted: true,
				data: [value, ...prevValue.data],
			}
		})
	}

	function handleLogin(value) {
		setLogin(prevValue => {
			return {
				...prevValue,
				pesel: value.pesel,
				password: value.password,
			}
		})
	}

	function handleLogout() {
		return setLogin({})
	}

	console.log(login)
	console.log(register.data)

	const userDataCtx = {
		status: register.accepted,
		data: register.data,
		balance: register.balance,
		handleRegister,
		handleLogin,
		loginData: login,
		handleLogout,
	}

	return <UserDataContext.Provider value={userDataCtx}>{children}</UserDataContext.Provider>
}

export default UserDataContext
