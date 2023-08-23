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
		<div>
			<label htmlFor={name}>{label}</label>
			<input
				id={name}
				name={name}
				type={type}
				placeholder={placeholder}
			></input>
		</div>
	);
}
