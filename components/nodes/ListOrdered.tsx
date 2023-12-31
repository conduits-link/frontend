import React from "react";

import RootNode from "./Root";

const ListOrdered = (props: any) => {
	const childrenArray = React.Children.toArray(props.children);

	return (
		<RootNode
			ideas={childrenArray[1]}
			editor={props.editor}
			node={props.node}
			mode={props.mode}
		>
			<ol {...props.attributes}>{childrenArray[0]}</ol>
		</RootNode>
	);
};

export default ListOrdered;
