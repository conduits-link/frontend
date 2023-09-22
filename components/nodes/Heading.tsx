import React from "react";

import RootNode from "./Root";

const Heading = (props: any) => {
	const childrenArray = React.Children.toArray(props.children);

	const getLevel = () => {
		switch (props.node.level) {
			case 1:
				return <h1 {...props.attributes}>{childrenArray[0]}</h1>;
			case 2:
				return <h2 {...props.attributes}>{childrenArray[0]}</h2>;
			case 3:
				return <h3 {...props.attributes}>{childrenArray[0]}</h3>;
			default:
				return <h2 {...props.attributes}>{childrenArray[0]}</h2>;
		}
	};

	return (
		<RootNode
			ideas={childrenArray[1]}
			editor={props.editor}
			node={props.node}
		>
			{getLevel()}
		</RootNode>
	);
};

export default Heading;
