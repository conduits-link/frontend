import React from "react";

import RootNode from "./Root";

const ListUnordered = (props: any) => {
	const childrenArray = React.Children.toArray(props.children);

	return (
		<RootNode
			ideas={childrenArray[1]}
			editor={props.editor}
			node={props.node}
			mode={props.mode}
		>
			<ul {...props.attributes}>{childrenArray[0]}</ul>
		</RootNode>
	);
};

export default ListUnordered;
