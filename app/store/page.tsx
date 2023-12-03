import StoreComponent from "@/components/wrappers/Store";

const StorePage = async () => {
	const files = await fetch(`${process.env.BACKEND_URL}/store`, {
		method: "GET",
	}).then((res) => res.json());

	return <StoreComponent files={files} />;
};

export default StorePage;
