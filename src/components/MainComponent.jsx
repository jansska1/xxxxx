import Welcome from './Welcome'
import Login from './Login'
import Logged from './Logged'
import Register from './Register'
import { UserDataContextProvider } from './store/UserDataContext'
import UserProgressContext from './store/UserProgressContext'
import { useContext } from 'react'

export default function MainComponent() {
	const userProgressCtx = useContext(UserProgressContext)
	console.log(userProgressCtx.status)

	return (
		<UserDataContextProvider>
			{!userProgressCtx.status ? <Welcome /> : <Logged />}
			<Login />
			<Register />
		</UserDataContextProvider>
	)
}
