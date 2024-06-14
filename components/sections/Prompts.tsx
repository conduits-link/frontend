"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FaPlus } from "react-icons/fa6";

import { useFlashMessage } from "@/utils/flash";
import { wrapFetch } from "@/utils/fetch";
import { Prompt } from "@/utils/prompts";

import Button from "@/components/buttons/Button";
import PromptEdit from "@/components/sections/PromptEdit";
import Input from "../form/Input";

import styles from "./Prompts.module.css";

const Prompts = ({ prompts }: { prompts: Prompt[] }) => {
	const { showFlashMessage } = useFlashMessage();
	const router = useRouter();

	async function onSubmit() {
		const { response, body } = await wrapFetch(
			{
				route: `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/prompts`,
				method: "POST",
				cookie: "",
				data: {},
			},
			showFlashMessage
		);

		if (body.redirect_url) router.push(body.redirect_url);
	}

	return (
		<div className={styles.containerMain}>
	      <div className={styles.heading}>
					<h1>Prompts</h1>
					<Button primary={true}>
						<FaPlus />
					</Button>
			</div>
			<div className={styles.containerPrompts}>
            {prompts.map((prompt) => (
               <PromptEdit key={prompt.id} prompt={prompt} />
            ))}
         </div>
		</div>
	);
};

export default Prompts;
