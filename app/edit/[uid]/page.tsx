import { cookies } from "next/headers";

import sendFetch from "@/utils/fetch";

import RootEditorComponent from "@/components/wrappers/RootEditor";

const Page = async ({ params }: { params: any }) => {
	const cookieStore = cookies();

	const res = (await sendFetch(
		`${process.env.NEXT_PUBLIC_API_URL}/store/docs/${params.uid}`,
		"GET",
		cookieStore.get("JWT") ? `JWT=${cookieStore.get("JWT")?.value}` : ""
	)) as apiResponse;

	return (
		<RootEditorComponent
			file={res.data.file}
			uid={params.uid}
		/>
	);
};

export default Page;
