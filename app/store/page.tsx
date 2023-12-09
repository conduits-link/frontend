import sendFetch from "@/utils/fetch";

import StoreComponent from "@/components/wrappers/Store";

const StorePage = async () => {
	const res = (await sendFetch(
		`${process.env.NEXT_PUBLIC_API_URL}/store/docs`,
		"GET",
		""
	)) as apiResponse;

	return <StoreComponent files={res.data.files} />;
};

export default StorePage;
