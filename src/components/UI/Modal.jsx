import { useRef } from 'react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ children, id, open, onClose, className = '' }) {
	const dialog = useRef()
	useEffect(() => {
		const modal = dialog.current
		if (open) {
			modal.showModal()
		}

		return () => modal.close()
	}, [open])

	return createPortal(
		<dialog
			id={id}
			ref={dialog}
			onClose={onClose}
			className={className}>
			{children}
		</dialog>,
		document.getElementById('modal')
	)
}
