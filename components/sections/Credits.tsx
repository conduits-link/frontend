"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useFlashMessage } from "@/utils/flash";
import { wrapFetch } from "@/utils/fetch";

import Button from "@/components/buttons/Button";
import { useEffect } from "react";

import styles from "./Credits.module.css";

const Credits = ({ credits }: { credits: number }) => {
	const { showFlashMessage } = useFlashMessage();
	const searchParams = useSearchParams();
	const router = useRouter();

	const sessionId = searchParams.get("session_id");

	async function onLoad() {
		if (!sessionId) return;

		const { response, body } = await wrapFetch(
			{
				route: `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/credits/${sessionId}`,
				method: "GET",
				cookie: "",
			},
			showFlashMessage
		);

		if (response.ok) {
			showFlashMessage(
				"success",
				body.added_credits + " credits were added successfully"
			);
		}
	}

	async function onSubmit() {
		const { response, body } = await wrapFetch(
			{
				route: `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/credits`,
				method: "POST",
				cookie: "",
				data: {},
			},
			showFlashMessage
		);

		if (body.redirect_url) router.push(body.redirect_url);
	}

	useEffect(() => {
		onLoad();
	}, []);

	return (
		<div className={styles.containerMain}>
			<h1>Credits</h1>
			<p>You have {credits} credits.</p>
			<Button onClick={() => onSubmit()} primary={true}>
				Add credits
			</Button>
		</div>
	);
};

export default Credits;
