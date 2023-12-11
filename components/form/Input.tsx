import styles from "./Input.module.css";

export default function Input({
	name,
	label,
	type,
	placeholder,
	value,
	onChange,
}: {
	name: string;
	label?: string;
	type: string;
	placeholder: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<div className={styles.container}>
			{label && (
				<label
					htmlFor={name}
					className={styles.label}
				>
					{label}
				</label>
			)}
			<input
				id={name}
				name={name}
				type={type}
				placeholder={placeholder}
				className={styles.element}
				onChange={onChange}
			/>
		</div>
	);
}
