export default function Body() {
	return (
		<section>
			<div className='flex justify-around md:max-w-screen-xl md:m-auto'>
				<div className='flex flex-col justify-center h-screen font-sans'>
					<p className='text-gradient fw-bold font-mono text-xl opacity-50 p-2 font-bold'>NewChance</p>
					<h1 className='flex flex-col text-gradient font-mono p-2'>
						<span className='text-8xl 2xl:text-9xl'>Bankowość</span>
						<span className='text-6xl 2xl:text-8xl'>w nowoczesnym</span>
						<span className='text-4xl 2xl:text-6xl'>wydaniu</span>
					</h1>
				</div>
				<div className='hidden xl:flex xl:items-center '>
					<img
						className='bg-none pr-6'
						src='../src/assets/cards.png'
						alt=''
					/>
				</div>
			</div>
		</section>
	)
}
