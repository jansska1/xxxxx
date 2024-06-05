// import Welcome from './components/Welcome'
// import Login from './components/Login'
// import Logged from './components/Logged'
import { UserProgressContextProvider } from './components/store/UserProgressContext'
// import Register from './components/Register'
// import { UserDataContextProvider } from './components/store/UserDataContext'
// import UserProgressContext from './components/store/UserProgressContext'
// import { useContext } from 'react'
import MainComponent from './components/MainComponent'

function App() {
	// const userProgressCtx = useContext(UserProgressContext)
	// console.log(userProgressCtx.status)

	return (
		<UserProgressContextProvider>
			<MainComponent />
		</UserProgressContextProvider>
	)
}

export default App
