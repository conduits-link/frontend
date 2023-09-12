import React from "react";

import RootNode from "./Root";

const Paragraph = (props: any) => {
	return (
		<RootNode
			editor={props.editor}
			node={props.node}
		>
			<p {...props.attributes}>{props.children}</p>
		</RootNode>
	);
};

export default Paragraph;
