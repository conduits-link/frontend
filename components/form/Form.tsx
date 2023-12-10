"use client";

import { ReactNode } from "react";

import styles from "./Form.module.css";

const Form = ({ children }: { children: ReactNode }) => {
	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	return (
		<form
			onSubmit={onSubmit}
			className={styles.container}
		>
			{children}
		</form>
	);
};

export default Form;
