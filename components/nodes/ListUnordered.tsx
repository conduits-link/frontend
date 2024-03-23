import React from "react";

import RootNode from "./Root";

const ListOrdered = (props: any) => {
	const childrenArray = React.Children.toArray(props.children);

	return (
		<RootNode
			ideas={null}
			editor={props.editor}
			node={props.node}
			mode={props.mode}
		>
			<ul {...props.attributes}>{childrenArray}</ul>
		</RootNode>
	);
};

export default ListOrdered;
