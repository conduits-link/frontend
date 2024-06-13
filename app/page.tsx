import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { ErrorMessage } from "@/utils/errors";
import { sendFetch } from "@/utils/fetch";

import StoreComponent from "@/components/sections/Store";
import Navigator from "@/components/wrappers/Navigator";

const StorePage = async () => {
	const cookieStore = cookies();

	const { response, body }: apiResponse = await sendFetch(
		`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/store/docs`,
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

	return (
		<Navigator selected="files">
			<StoreComponent initialFiles={body.docs} />
		</Navigator>
	);
};

export default StorePage;
