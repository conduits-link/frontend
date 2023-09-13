import React from "react";

import RootNode from "./Root";

const Paragraph = (props: any) => {
	const childrenArray = React.Children.toArray(props.children);

	return (
		<RootNode
			ideas={childrenArray[1]}
			editor={props.editor}
			node={props.node}
		>
			<p {...props.attributes}>{childrenArray[0]}</p>
		</RootNode>
	);
};

export default Paragraph;
