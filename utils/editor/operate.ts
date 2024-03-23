import { Editor, Transforms, Node } from "slate";

import { EditorInterface } from "./slate";

export const EditorOperate = {
	//#region Core operations
	// toggleBlock(
	// 	editorState: Editor,
	// 	nodeType: string,
	// 	path?: number[],
	// 	options?: any
	// ) {
	// 	var actualPath: number[] = [];
	// 	if (typeof path !== "undefined") actualPath = path;
	// 	else {
	// 		const currentSelection = editorState.selection;
	// 		if (currentSelection) {
	// 			const [start] = Range.edges(currentSelection);

	// 			// remove the two trailing 'text' nodes from the path
	// 			actualPath = start.path.slice(0, -2);
	// 		}
	// 	}

	// 	const node = Editor.node(editorState, actualPath)[0];
	// 	const newBlockIsSame = EditorInterface.newBlockIsSameAsCurrentBlock(
	// 		node,
	// 		nodeType,
	// 		options
	// 	);

	// 	if (newBlockIsSame) {
	// 		Transforms.setNodes(
	// 			editorState,
	// 			Object.assign({ type: "paragraph" }),
	// 			{
	// 				at: actualPath,
	// 			}
	// 		);
	// 	} else {
	// 		Transforms.setNodes(
	// 			editorState,
	// 			Object.assign({ type: nodeType }, options),
	// 			{ at: actualPath }
	// 		);
	// 	}

	// 	// if we are toggling a list item
	// 	if (
	// 		EditorInterface.isNodeAListItem(nodeType) ||
	// 		EditorInterface.isNodeAListItem(node)
	// 	) {
	// 		const LIST_WRAPPER_TYPE = nodeType.slice(
	// 			0,
	// 			nodeType.lastIndexOf("-item")
	// 		);

	// 		if (!EditorInterface.isNodeAList(editorState, [actualPath[0]])) {
	// 			// if there is not a 'list-ordered' or 'list-unordered' parent node, add one

	// 			Transforms.wrapNodes(
	// 				editorState,
	// 				{
	// 					type: LIST_WRAPPER_TYPE,
	// 					children: [],
	// 				},
	// 				{ at: actualPath }
	// 			);
	// 		} else {
	// 			this.splitList(editorState, actualPath[0], actualPath[1], nodeType);
	// 		}
	// 	}
	// },

	toggleNode(
		editorState: Editor,
		node: Node,
		newType: string,
		newOptions?: any
	) {
		const nodeParentIsWrappedInList = EditorInterface.isNodeWrappedInList(
			editorState,
			node
		);

		let newNodeType = newType;
		const currentNodeType = EditorInterface.getNodeType(node);
		if (currentNodeType !== newType) {
			EditorInterface.setNodeType(
				editorState,
				node,
				newNodeType,
				newOptions
			);
		} else {
			newNodeType = "paragraph";
			EditorInterface.setNodeType(editorState, node, newNodeType);
		}

		// if node is a list item, and does not have a list wrapper, add one
		if (
			EditorInterface.isNodeAListItem(newNodeType) &&
			!nodeParentIsWrappedInList
		) {
			EditorInterface.insertListWrapper(
				editorState,
				node,
				EditorInterface.getCorrespondingListType(newNodeType)
			);
		}
		// if node is a list item, and has a list wrapper, split the list
		else if (EditorInterface.isNodeAListItem(newNodeType)) {
			EditorOperate.splitList(editorState, node, newNodeType);
		}
	},
	toggleMark(editorState: Editor, markType: string, options?: any) {
		const newBlockIsSame = EditorInterface.isMarkActive(
			editorState,
			markType
		);
		if (newBlockIsSame) {
			Editor.removeMark(editorState, markType);
		} else if (options) {
			Editor.addMark(editorState, markType, options);
		} else {
			Editor.addMark(editorState, markType, true);
		}
	},
	//#endregion

	//#region List operations
	splitList(editorState: Editor, listItemNode: Node, newNodeType: string) {
		// NOTE: this function splits a list into two lists right next to each other, it does not
		// 'leave space for' or interact with the new node that goes between the lists.

		// check this node is a list item and is wrapped in a list
		if (!EditorInterface.isNodeAListItem(listItemNode)) return;
		const parent = EditorInterface.getNodeParent(editorState, listItemNode);
		if (!parent || !EditorInterface.isNodeAList(parent)) return;

		// get the path of the parent node
		const parentPath = EditorInterface.getNodePath(editorState, parent);

		// get the index of the list item within the list
		const listItemIndex =
			EditorInterface.getIndexOfCurrentListItem(editorState);

		// collect all list items before the current list item, not including the current list item
		let beforeListItems: Node[] = [];
		for (let i = 0; i < listItemIndex; i++) {
			beforeListItems.push(
				EditorInterface.getNodeAtPosition(editorState, parentPath.concat(i))
			);
		}

		// collect all list items after the current list item, not including the current list item
		let afterListItems: Node[] = [];
		for (
			let i = listItemIndex + 1;
			i < EditorInterface.getNodeChildren(parent).length;
			i++
		) {
			afterListItems.push(
				EditorInterface.getNodeAtPosition(editorState, parentPath.concat(i))
			);
		}

		// get the type of the parent list
		const parentListType = EditorInterface.getNodeType(parent);

		// delete the current list
		Transforms.delete(editorState, { at: parentPath });

		// add the before and after list items to new lists, and insert them into the editor
		// NOTE: after list items are inserted first to ensure the list items are added in
		// the correct order, without having to change the parent path indices
		if (afterListItems.length > 0) {
			const afterList = {
				type: parentListType,
				children: afterListItems,
			};
			EditorInterface.insertNode(editorState, afterList, parentPath);
		}
		if (beforeListItems.length > 0) {
			const beforeList = {
				type: parentListType,
				children: beforeListItems,
			};
			EditorInterface.insertNode(editorState, beforeList, parentPath);
		}
	},
	mergeLists(editorState: Editor, beforeListIndex: number) {
		const beforeList = Editor.node(editorState, [beforeListIndex])[0];
		const afterList = Editor.node(editorState, [beforeListIndex + 1])[0];

		const beforeListChildren = EditorInterface.getNodeChildren(beforeList);
		const afterListChildren = EditorInterface.getNodeChildren(afterList);

		const newList = {
			type: EditorInterface.getNodeType(beforeList),
			children: beforeListChildren
				.map((_, i) => Editor.node(editorState, [beforeListIndex, i])[0])
				.concat(
					afterListChildren.map(
						(_, i) =>
							Editor.node(editorState, [beforeListIndex + 1, i])[0]
					)
				),
		};

		const selection = editorState.selection;
		const pathExists = Node.isNode(selection?.anchor.path);

		// if selection is above list, set selection to the first element of the list
		let selectIndex = 0;
		if (
			!pathExists &&
			selection &&
			selection.anchor.path[0] > beforeListIndex
		) {
			selectIndex = newList.children.length - 1;
		} else if (pathExists && selection) {
			selectIndex = selection.anchor.path[1];
		}

		Transforms.delete(editorState, { at: [beforeListIndex] });
		Transforms.delete(editorState, { at: [beforeListIndex] });

		if (newList.children.length > 0) {
			Transforms.insertNodes(editorState, newList, {
				at: [beforeListIndex],
			});
		}

		Transforms.select(editorState, [beforeListIndex, selectIndex]);
		Transforms.collapse(editorState, { edge: "end" });
	},
	//#endregion
};
