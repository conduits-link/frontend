import styles from "./Input.module.css";

export default function Input({
	name,
	label,
	type,
	placeholder,
	value,
}: {
	name: string;
	label: string;
	type: string;
	placeholder: string;
	value?: string;
}) {
	return (
		<div className={styles.container}>
			<label
				htmlFor={name}
				className={styles.label}
			>
				{label}
			</label>
			<input
				id={name}
				name={name}
				type={type}
				placeholder={placeholder}
				className={styles.element}
			/>
		</div>
	);
}
