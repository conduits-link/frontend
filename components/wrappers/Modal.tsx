import styles from "./Modal.module.css";

const Modal = ({
	title,
	text,
	onSubmit,
	onClose,
	children,
}: {
	title: string;
	text: string;
	onSubmit: () => void;
	onClose: any;
	children: React.ReactNode;
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.element}>
				<button onClick={onClose}>X</button>
				<h2>{title}</h2>
				<p>{text}</p>
				<form>
					{children}
					<button
						type="button"
						onClick={() => {
							onSubmit();
							onClose();
						}}
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Modal;
