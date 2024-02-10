import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { ErrorMessage } from "@/utils/errors";
import sendFetch from "@/utils/fetch";

import RootEditorComponent from "@/components/wrappers/RootEditor";

const Page = async ({ params }: { params: any }) => {
	const cookieStore = cookies();

	const res: apiResponse = await sendFetch(
		`${process.env.NEXT_PUBLIC_API_URL}/store/docs/${params.uid}`,
		"GET",
		cookieStore.get("jwt") ? `jwt=${cookieStore.get("jwt")?.value}` : ""
	);

	if (!res.response.ok) {
		switch (res.response.status) {
			case 401:
				return redirect(
					`/login?flashMessage=${ErrorMessage.AUTHENTICATION}`
				);
			case 403:
				return redirect(
					`/login?flashMessage=${ErrorMessage.AUTHENTICATION}`
				);
			default:
				return redirect(`/login?flashMessage=${ErrorMessage.SERVER}`);
		}
	}

	return <RootEditorComponent file={res.body.data.file} uid={params.uid} />;
};

export default Page;
