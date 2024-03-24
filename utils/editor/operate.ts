import { Editor, Node } from "slate";

import { EditorInterface } from "./slate";

export const EditorOperate = {
	//#region Core operations
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

		let newNodeType = type;
		const currentNodeType = EditorInterface.getNodeType(editorState, node);

		// TODO: check if options are different from current node options
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
		// if the new node is not a list item, and has a list wrapper, remove the list wrapper
		else if (nodeParentIsWrappedInList) {
			const listItemContent = EditorInterface.getNodeContent(
				editorState,
				node
			);

			EditorOperate.splitList(editorState, node);

			EditorInterface.insertNode(
				editorState,
				EditorInterface.generateNewNode(
					newNodeType,
					"text",
					listItemContent,
					options
				),
				[node[0]]
			);

			if (EditorInterface.isNodeAListItem(editorState, newNodeType)) {
				EditorInterface.insertListWrapper(
					editorState,
					[node[0]],
					EditorInterface.getCorrespondingListType(
						editorState,
						newNodeType
					)
				);
			}

			EditorInterface.setCursor(editorState, [node[0]]);
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

		// // check this node is a list item and is wrapped in a list - actually it sometimes won't be a list if we are trying to rectify
		// if (!EditorInterface.isNodeAListItem(editorState, listItemNode)) return;
		const parent = EditorInterface.getNodeParent(editorState, listItemNode);

		if (!parent.node) return;

		if (!EditorInterface.isNodeAList(editorState, parent.path)) return;

		// get the index of the list item within the list
		const listItemIndex =
			EditorInterface.getIndexOfCurrentListItem(editorState);

		// collect all list items before the current list item, not including the current list item
		let beforeListItems: Node[] = [];
		for (let i = 0; i < listItemIndex; i++) {
			beforeListItems.push(
				EditorInterface.getNode(editorState, parent.path.concat(i))
			);
		}

		// collect all list items after the current list item, not including the current list item
		let afterListItems: Node[] = [];
		for (
			let i = listItemIndex + 1;
			i < EditorInterface.getNodeChildren(editorState, parent.path).length;
			i++
		) {
			afterListItems.push(
				EditorInterface.getNode(editorState, parent.path.concat(i))
			);
		}

		// get the type of the parent list
		const parentListType = EditorInterface.getNodeType(
			editorState,
			parent.path
		);

		// delete the current list
		EditorInterface.deleteNode(editorState, parent.path);

		// add the before and after list items to new lists, and insert them into the editor
		// NOTE: after list items are inserted first to ensure the list items are added in
		// the correct order, without having to change the parent path indices
		if (afterListItems.length > 0) {
			const afterList = {
				type: parentListType,
				children: afterListItems,
			};
			EditorInterface.insertNode(editorState, afterList, parent.path);
		}
		if (beforeListItems.length > 0) {
			const beforeList = {
				type: parentListType,
				children: beforeListItems,
			};
			EditorInterface.insertNode(editorState, beforeList, parent.path);
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
		if (!parent.node) return;

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
		EditorInterface.insertNode(editorState, mergedList, parent.path);
	},
	//#endregion
};
