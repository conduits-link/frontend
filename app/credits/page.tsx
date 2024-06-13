import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { sendFetch } from "@/utils/fetch";

import Credits from "@/components/sections/Credits";
import { ErrorMessage } from "@/utils/errors";

const Page = async () => {
	const cookieStore = cookies();

	const { response, body }: apiResponse = await sendFetch(
		`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/credits`,
		"GET",
		cookieStore.get("jwt") ? `jwt=${cookieStore.get("jwt")?.value}` : ""
	);

	if (!response.ok) {
		switch (response.status) {
			case 401:
				return redirect(`/login?flashMessage=${ErrorMessage.STATUS_401}`);
			default:
				return redirect(`/?flashMessage=${ErrorMessage.STATUS_500}`);
		}
	}

	return <Credits credits={body.credits} />;
};

export default Page;
