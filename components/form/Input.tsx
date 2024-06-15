import { useEffect, useState } from "react";

import styles from "./Input.module.css";

export default function Input({
	name,
	label,
	type,
	placeholder,
	value,
	onChange,
	validations,
	onValidationError,
	onValidationSuccess,
}: {
	name: string;
	label?: string;
	type: string;
	placeholder: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validations?: {
		type: "required" | "email" | "minLength" | "maxLength" | "match";
		value?: any;
		errorMessage: string;
	}[];
	onValidationError?: () => void;
	onValidationSuccess?: () => void;
}) {
	const [inputValue, setInputValue] = useState("");

	const [userInteracted, setUserInteracted] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (validations && userInteracted) {
			let newError = "";
			for (let i = 0; i < validations.length; i++) {
				const validation = validations[i];
				switch (validation.type) {
					case "required":
						if (!inputValue) newError = validation.errorMessage;
						break;
					case "email":
						const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
						if (!emailRegex.test(inputValue!))
							newError = validation.errorMessage;
						break;
					case "minLength":
						if (inputValue!.length < validation.value)
							newError = validation.errorMessage;
						break;
					case "maxLength":
						if (inputValue!.length > validation.value)
							newError = validation.errorMessage;
						break;
					case "match":
						if (inputValue !== validation.value)
							newError = validation.errorMessage;
						break;
					default:
						break;
				}
				if (newError) break;
			}
			setError(newError);

			// Call the appropriate function based on whether there is an error
			if (newError) {
				onValidationError && onValidationError();
			} else {
				onValidationSuccess && onValidationSuccess();
			}
		}
	}, [inputValue]);

	return (
		<div className={styles.container}>
			{label && (
				<label htmlFor={name} className={styles.label}>
					{label}
				</label>
			)}
			<input
				id={name}
				name={name}
				type={type}
            defaultValue={value}
				placeholder={placeholder}
				className={styles.element}
				onChange={(e) => {
					setInputValue(e.target.value);
					if (!userInteracted) setUserInteracted(true);
					onChange && onChange(e);
				}}
				required={validations?.some((v) => v.type === "required")}
			/>
			{validations && (
				<small className={styles.error}>{error && error}</small>
			)}
		</div>
	);
}
