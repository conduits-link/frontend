import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { ErrorMessage } from "@/utils/errors";
import { sendFetch } from "@/utils/fetch";

import RootEditorComponent from "@/components/wrappers/RootEditor";

const Page = async ({ params }: { params: any }) => {
	const cookieStore = cookies();

	const { response, body }: apiResponse = await sendFetch(
		`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/store/docs/${params.uid}`,
		"GET",
		cookieStore.get("jwt") ? `jwt=${cookieStore.get("jwt")?.value}` : ""
	);

	if (!response.ok) {
		switch (response.status) {
			case 401:
				return redirect(`/login?flashMessage=${ErrorMessage.STATUS_401}`);
			case 404:
				return redirect(`/store?flashMessage=${ErrorMessage.STATUS_404}`);
			default:
				return redirect(`/store?flashMessage=${ErrorMessage.STATUS_500}`);
		}
	}

	return <RootEditorComponent file={body.doc} uid={params.uid} />;
};

export default Page;
