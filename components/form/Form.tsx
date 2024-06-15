"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

import { apiResponse } from "@/utils/types";

import { useFlashMessage } from "@/utils/flash";
import { wrapFetch } from "@/utils/fetch";

import styles from "./Form.module.css";

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

		await wrapFetch(
			{
				route: `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}${url}`,
				method: "POST",
				cookie: "",
				data,
			},
			showFlashMessage,
			redirectUrl
				? {
						url: redirectUrl,
						router,
				  }
				: undefined,
			onRes
		);
	}

	return (
		<form onSubmit={onSubmit} className={styles.container}>
			{children}
		</form>
	);
};

export default Form;
