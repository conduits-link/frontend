"use client";

import { useRouter } from "next/navigation";

import { useFlashMessage } from "@/utils/flash";
import { wrapFetch } from "@/utils/fetch";

import Button from "@/components/buttons/Button";

const Page = () => {
	const { showFlashMessage } = useFlashMessage();
	const router = useRouter();

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

	return (
		<Button onClick={() => onSubmit()} primary={true}>
			Add credits
		</Button>
	);
};

export default Page;
