import React from "react";

import RootNode from "./Root";

const Image = (props: any) => {
	const childrenArray = React.Children.toArray(props.children);

	return (
		<RootNode
			ideas={childrenArray[1]}
			editor={props.editor}
			node={props.node}
			mode={props.mode}
		>
			<img
				{...props.attributes}
				src={props.node.url}
				alt={props.node.alt}
				style={{ width: "100%" }}
			/>
		</RootNode>
	);
};

export default Image;
