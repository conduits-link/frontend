import React from "react";

import RootNode from "./Root";

const Blockquote = (props: any) => {
	const childrenArray = React.Children.toArray(props.children);

	return (
		<RootNode
			ideas={childrenArray[1]}
			editor={props.editor}
			node={props.node}
			mode={props.mode}
		>
			<blockquote {...props.attributes}>{childrenArray[0]}</blockquote>
		</RootNode>
	);
};

export default Blockquote;
