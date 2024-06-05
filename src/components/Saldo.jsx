import Button from './UI/Button'

export default function Saldo({ userData }) {
	return (
		<div className='md:m-auto md:max-w-screen-xl'>
			<h3 className='font-bold text-center text-4xl p-4'>Witaj {userData.pesel}</h3>
			<div className='flex flex-col items-center'>
				<div className='relative w-96 h-48 bg-gray-900 rounded-md'>
					<p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>0000.00zł</p>
					<p className='absolute bottom-0 left-0 mb-2 ml-2 uppercase font-bold'>saldo</p>
				</div>

				<div>
					<menu className='flex gap-2'>
						<Button>Wpłać</Button>
						<Button>Wypłać</Button>
						<Button>Przelej</Button>
					</menu>
				</div>
			</div>
		</div>
	)
}
