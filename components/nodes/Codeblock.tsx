import React from "react";

import RootNode from "./Root";

const Codeblock = (props: any) => {
	const childrenArray = React.Children.toArray(props.children);

	return (
		<RootNode
			ideas={childrenArray[1]}
			editor={props.editor}
			node={props.node}
			mode={props.mode}
		>
			<pre {...props.attributes}>{childrenArray[0]}</pre>
		</RootNode>
	);
};

export default Codeblock;
