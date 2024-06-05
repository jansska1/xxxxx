export default function Input({ label, className, special, id, ...props }) {
	let cssClass = 'w-full border rounded-md border-rose-600 font-inherit p-2 focus:outline-none ' + className

	return (
		<p className={`flex flex-col + ${special}`}>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				name={id}
				required
				{...props}
				className={cssClass}
			/>
		</p>
	)
}
