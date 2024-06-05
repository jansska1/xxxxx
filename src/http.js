function getRandom11DigitNumber() {
    let min = 10000000000; // smallest 11-digit number
    let max = 99999999999; // largest 11-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function fetchAvailableUsers(data) {
	const response = await fetch(`http://localhost:8080/client/${data.pesel}/${data.password}`)
	const loggedUser = await response.json()

	console.log(loggedUser)

	if (!response.ok) {
		throw new Error('Failed to fetch user')
	}

	return loggedUser
}

export async function createAccount(client, data) {
	const response = await fetch(`http://localhost:8080/account/client/${data.id}`, {
		method: "PUT",
		body: data,
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const createdAccount = await response.json()

	if (!response.ok) {
		throw new Error('Failed to create account')
	}

	return createdAccount
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

	await createAccount(resData.json.id, {
		"title": "Główne",
		"number": getRandom11DigitNumber(),
		"saldo": 0.0
	})

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