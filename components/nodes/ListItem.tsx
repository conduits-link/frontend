import React from "react";

import RootNode from "./Root";

const ListItem = (props: any) => {
	const childrenArray = React.Children.toArray(props.children);

	return (
		// <RootNode
		// 	ideas={childrenArray[1]}
		// 	editor={props.editor}
		// 	node={props.node}
		// 	mode={props.mode}
		// >
		<li {...props.attributes}>{childrenArray[0]}</li>
		// </RootNode>
	);
};

export default ListItem;
