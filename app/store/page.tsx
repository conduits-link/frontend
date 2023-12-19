import { cookies } from "next/headers";

import sendFetch from "@/utils/fetch";

import StoreComponent from "@/components/wrappers/Store";

const StorePage = async (params: any) => {
	const cookieStore = cookies();

	const res = (await sendFetch(
		`${process.env.NEXT_PUBLIC_API_URL}/store/docs`,
		"GET",
		cookieStore.get("JWT") ? `JWT=${cookieStore.get("JWT")?.value}` : ""
	)) as apiResponse;

	return <StoreComponent initialFiles={res.data.files} />;
};

export default StorePage;
