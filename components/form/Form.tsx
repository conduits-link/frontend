"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

import sendFetch from "@/utils/fetch";

import styles from "./Form.module.css";
import { useFlashMessage } from "@/utils/flash";

const Form = ({
	url,
	data,
	redirectUrl,
	onRes,
	children,
}: {
	url: string;
	data: { [key: string]: any };
	redirectUrl?: string;
	onRes?: (res: apiResponse) => void;
	children: ReactNode;
}) => {
	const router = useRouter();
	const { showFlashMessage } = useFlashMessage();

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const res = (await sendFetch(
			`${process.env.NEXT_PUBLIC_API_URL}${url}`,
			"POST",
			"",
			data
		)) as apiResponse;

		if (res.status === 200) {
			if (redirectUrl) router.push(redirectUrl);
			onRes && onRes(res);
		} else {
			showFlashMessage("error", res.message);
		}
	}

	return (
		<form onSubmit={onSubmit} className={styles.container}>
			{children}
		</form>
	);
};

export default Form;
