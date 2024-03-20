import React from "react";

import { Node } from "slate";

import { LIST_ITEMS } from "@/utils/editor/slate";

import RootNode from "./Root";

const ListOrdered = (props: any) => {
	const childrenArray = React.Children.toArray(props.children);

	let nodes: any = [];
	let ideas: any = undefined;
	props.node.children.forEach((child: Node, i: any) => {
		if (LIST_ITEMS.includes(child.type)) {
			nodes.push(childrenArray[i]);
		} else {
			if (ideas === undefined) {
				ideas = [];
			}
			ideas.push(childrenArray[i]);
		}
	});

	return (
		<RootNode
			ideas={ideas}
			editor={props.editor}
			node={props.node}
			mode={props.mode}
		>
			<ul {...props.attributes}>{nodes}</ul>
		</RootNode>
	);
};

export default ListOrdered;
