import { Editor, Node } from "slate";

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
		node: number[],
		type: string,
		options?: any
	) {
		const nodeParentIsWrappedInList = EditorInterface.isNodeWrappedInList(
			editorState,
			node
		);
		const nodeParent = EditorInterface.getNodeParent(editorState, node);
		if (!nodeParent) return;
		const nodeParentPath = EditorInterface.getNode(editorState, nodeParent);

		let newNodeType = type;
		const currentNodeType = EditorInterface.getNodeType(editorState, node);
		if (currentNodeType !== type) {
			EditorInterface.setNodeType(editorState, node, newNodeType, options);
		} else {
			newNodeType = "paragraph";
			EditorInterface.setNodeType(editorState, node, newNodeType);
		}

		// if node is a list item, and does not have a list wrapper, add one
		if (
			EditorInterface.isNodeAListItem(editorState, newNodeType) &&
			!nodeParentIsWrappedInList
		) {
			EditorInterface.insertListWrapper(
				editorState,
				node,
				EditorInterface.getCorrespondingListType(editorState, newNodeType)
			);
		}
		// if the new node is a list item, and has a list wrapper, split the list
		else if (EditorInterface.isNodeAListItem(editorState, newNodeType)) {
			EditorOperate.splitList(editorState, node);
		}
		// if the new node is not a list item, and has a list wrapper, remove the list wrapper
		else if (nodeParentIsWrappedInList) {
			// get content of list item
			// const listItemContent = EditorInterface.getNodeContent(node);
			// console.log(listItemContent);
			// EditorOperate.splitList(editorState, node);
			// add paragraph node to index after the current node
			// const newParagraph = EditorInterface.generateNewNode(
			// 	"paragraph",
			// 	"text",
			// 	listItemContent
			// );
			// EditorInterface.insertNode(editorState, newParagraph, nodeParentPath);
			// EditorInterface.removeListWrapper(editorState, [nodeParentPath[0]]);
			// console.log(editorState);
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
	splitList(editorState: Editor, listItemNode: number[]) {
		// NOTE: this function splits a list into two lists right next to each other, it does not
		// 'leave space for' or interact with the new node that goes between the lists.

		// check this node is a list item and is wrapped in a list
		if (!EditorInterface.isNodeAListItem(editorState, listItemNode)) return;
		const parent = EditorInterface.getNodeParent(editorState, listItemNode);

		if (!parent) return;

		const parentPath = EditorInterface.getNode(editorState, parent);

		if (!EditorInterface.isNodeAList(editorState, parentPath)) return;

		// get the index of the list item within the list
		const listItemIndex =
			EditorInterface.getIndexOfCurrentListItem(editorState);

		// collect all list items before the current list item, not including the current list item
		let beforeListItems: Node[] = [];
		for (let i = 0; i < listItemIndex; i++) {
			beforeListItems.push(
				EditorInterface.getNode(editorState, parentPath.concat(i))
			);
		}

		// collect all list items after the current list item, not including the current list item
		let afterListItems: Node[] = [];
		for (
			let i = listItemIndex + 1;
			i < EditorInterface.getNodeChildren(editorState, parentPath).length;
			i++
		) {
			afterListItems.push(
				EditorInterface.getNode(editorState, parentPath.concat(i))
			);
		}

		// get the type of the parent list
		const parentListType = EditorInterface.getNodeType(
			editorState,
			parentPath
		);

		// delete the current list
		EditorInterface.deleteNode(editorState, parentPath);

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
	mergeLists(editorState: Editor, beforeListNode: number[]) {
		// check if beforeListNode is a list
		if (!EditorInterface.isNodeAList(editorState, beforeListNode)) return;

		// as it is a root node (verified with the above if),
		// we can get the first index in the path
		const beforeListNodeIndex = beforeListNode[0];

		const afterNodePath = [beforeListNodeIndex + 1];

		// get node after beforeListNode
		const afterListNode = EditorInterface.getNode(editorState, afterNodePath);
		// check if afterListNode exists, and is a list
		if (
			!afterListNode ||
			!EditorInterface.isNodeAList(editorState, afterNodePath)
		)
			return;

		// get the path of beforeListNode
		const parent = EditorInterface.getNodeParent(editorState, beforeListNode);
		if (!parent) return;
		const parentPath = EditorInterface.getNode(editorState, parent);

		// get the type of beforeListNode
		const beforeListNodeType = EditorInterface.getNodeType(
			editorState,
			beforeListNode
		);

		// get the children of the lists
		const beforeListItems = EditorInterface.getNodeChildren(
			editorState,
			beforeListNode
		);
		const afterListItems = EditorInterface.getNodeChildren(
			editorState,
			afterNodePath
		);

		// delete the two lists
		// NOTE: the same is being deleted twice because the editorState is
		// not updated after the first
		// TODO: improve robustness here
		EditorInterface.deleteNode(editorState, afterNodePath);
		EditorInterface.deleteNode(editorState, beforeListNode);

		// merge the two lists into one
		const mergedList = {
			type: beforeListNodeType,
			children: beforeListItems.concat(afterListItems),
		};
		EditorInterface.insertNode(editorState, mergedList, parentPath);
	},
	//#endregion
};
