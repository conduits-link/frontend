import React from "react";

import RootNode from "./Root";

const Paragraph = ({
	children,
	...attributes
}: {
	children: React.ReactNode;
}) => {
	return (
		<RootNode>
			<p {...attributes}>{children}</p>
		</RootNode>
	);
};

export default Paragraph;
