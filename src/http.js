export async function fetchAvailableUsers(data) {
	const response = await fetch(`http://localhost:8080/client/${data.pesel}/${data.password}`)
	const loggedUser = await response.json()

	console.log(loggedUser)

	if (!response.ok) {
		throw new Error('Failed to fetch user')
	}

	return loggedUser
}

export async function createUser(user) {
	const response = await fetch('http://localhost:8080/client', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
	const resData = await response.json()
	console.log(resData.message)

	if (!response.ok) {
		throw new Error('Failed to update user data.')
	}
}

export async function makeTransfer(data) {
	const response = await fetch(`http://localhost:8080/operation/transfer`, {
		method: "PUT",
		body: data,
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const doneTransfer = await response.json()

	console.log(doneTransfer)

	if (!response.ok) {
		throw new Error('Failed to fetch user')
	}

	return doneTransfer
}