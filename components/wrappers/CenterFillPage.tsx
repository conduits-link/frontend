import { ReactNode } from "react";

const CenterFillPageComponent = ({ children }: { children: ReactNode }) => {
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{children}
		</div>
	);
};

export default CenterFillPageComponent;
