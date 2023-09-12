import React from "react";

import RootNode from "./Root";

const Paragraph = (props: any) => {
	return (
		<RootNode>
			<p {...props.attributes}>{props.children}</p>
		</RootNode>
	);
};

export default Paragraph;
