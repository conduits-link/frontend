import { Editor } from "slate";

import {
	EditorInterface,
	ElementType,
	ListOrderedElement,
	ListOrderedItemElement,
	ListUnorderedElement,
	ListUnorderedItemElement,
} from "./slate";

export const EditorOperate = {
	//#region Core operations
	toggleNode(
		editorState: Editor,
		node: number[],
		type: ElementType,
		options?: any
	): void {
		const nodeParentIsWrappedInList = EditorInterface.isNodeWrappedInList(
			editorState,
			node
		);

		let newNodeType: ElementType = type;
		const currentNodeType = EditorInterface.getNodeType(editorState, node);

		// TODO: check if options are different from current node options
		if (currentNodeType !== type) {
			EditorInterface.setNodeType(editorState, node, newNodeType, options);
		} else {
			newNodeType = ElementType.Paragraph;
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
				newNodeType === ElementType.ListOrderedItem
					? ElementType.ListOrdered
					: ElementType.ListUnordered
			);
		}
		// if the new node is not a list item, and has a list wrapper, remove the list wrapper
		else if (nodeParentIsWrappedInList) {
			const listItemContent = EditorInterface.getNodeContent(
				editorState,
				node
			);

			EditorOperate.splitList(editorState, node);

			const insertPosition =
				node[node.length - 1] === 0 ? [node[0]] : [node[0] + 1];

			EditorInterface.insertNode(
				editorState,
				EditorInterface.generateNewNode(
					newNodeType,
					listItemContent,
					options
				),
				insertPosition
			);

			if (EditorInterface.isNodeAListItem(editorState, newNodeType)) {
				EditorInterface.insertListWrapper(
					editorState,
					insertPosition,
					newNodeType === ElementType.ListOrderedItem
						? ElementType.ListOrdered
						: ElementType.ListUnordered
				);
				EditorInterface.setCursor(editorState, insertPosition.concat(0));
			} else {
				EditorInterface.setCursor(editorState, insertPosition);
			}
		}
	},
	toggleMark(editorState: Editor, markType: string, options?: any): void {
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
	/**
	 * Split a list into two new consecutive lists.
	 * @param editorState The current editor state.
	 * @param listItemNode The path of the list item to split.
	 * @returns void
	 */
	splitList(editorState: Editor, listItemNode: number[]): void {
		const listNode = [listItemNode[0]];

		// check if the item has a list wrapper
		if (!EditorInterface.isNodeAList(editorState, listNode)) return;

		// get the index of the list item within the list
		const listItemIndex =
			EditorInterface.getIndexOfCurrentListItem(editorState);

		// collect all list items before the current list item, not including the current list item
		let beforeListItems:
			| ListUnorderedItemElement[]
			| ListOrderedItemElement[] = [];

		if (
			EditorInterface.getNodeType(editorState, listNode) ===
			ElementType.ListOrdered
		) {
			let tmpBeforeListItems = [];
			for (let i = 0; i < listItemIndex; i++) {
				tmpBeforeListItems.push(
					EditorInterface.getNode(
						editorState,
						listNode.concat(i)
					) as ListUnorderedItemElement
				);
			}
			beforeListItems = tmpBeforeListItems;
		} else if (
			EditorInterface.getNodeType(editorState, listNode) ===
			ElementType.ListUnordered
		) {
			let tmpBeforeListItems = [];
			for (let i = 0; i < listItemIndex; i++) {
				tmpBeforeListItems.push(
					EditorInterface.getNode(
						editorState,
						listNode.concat(i)
					) as ListUnorderedItemElement
				);
			}
			beforeListItems = tmpBeforeListItems;
		}

		// collect all list items after the current list item, not including the current list item
		let afterListItems:
			| ListUnorderedItemElement[]
			| ListOrderedItemElement[] = [];

		if (
			EditorInterface.getNodeType(editorState, listNode) ===
			ElementType.ListOrdered
		) {
			let tmpAfterListItems = [];
			for (
				let i = listItemIndex + 1;
				i < EditorInterface.getNodeChildren(editorState, listNode).length;
				i++
			) {
				tmpAfterListItems.push(
					EditorInterface.getNode(
						editorState,
						listNode.concat(i)
					) as ListUnorderedItemElement
				);
			}
			afterListItems = tmpAfterListItems;
		} else if (
			EditorInterface.getNodeType(editorState, listNode) ===
			ElementType.ListUnordered
		) {
			let tmpAfterListItems = [];
			for (
				let i = listItemIndex + 1;
				i < EditorInterface.getNodeChildren(editorState, listNode).length;
				i++
			) {
				tmpAfterListItems.push(
					EditorInterface.getNode(
						editorState,
						listNode.concat(i)
					) as ListUnorderedItemElement
				);
			}
			afterListItems = tmpAfterListItems;
		}

		// get the type of the parent list
		const parentListType = EditorInterface.getNodeType(editorState, listNode);

		// delete the current list
		EditorInterface.deleteNode(editorState, listNode);

		// add the before and after list items to new lists, and insert them into the editor
		// NOTE: after list items are inserted first to ensure the list items are added in
		// the correct order, without having to change the parent path indices
		if (afterListItems.length > 0) {
			let afterList: ListOrderedElement | ListUnorderedElement;

			if (parentListType === ElementType.ListOrdered) {
				afterList = {
					type: parentListType,
					children: afterListItems,
				} as ListOrderedElement;
			} else {
				afterList = {
					type: parentListType,
					children: afterListItems,
				} as ListUnorderedElement;
			}

			EditorInterface.insertNode(editorState, afterList, listNode);
		}
		if (beforeListItems.length > 0) {
			let beforeList: ListOrderedElement | ListUnorderedElement;

			if (parentListType === ElementType.ListOrdered) {
				beforeList = {
					type: parentListType,
					children: beforeListItems,
				} as ListOrderedElement;
			} else {
				beforeList = {
					type: parentListType,
					children: beforeListItems,
				} as ListUnorderedElement;
			}

			EditorInterface.insertNode(editorState, beforeList, listNode);
		}
	},
	mergeLists(editorState: Editor, beforeListNode: number[]): void {
		// check if beforeListNode is a list
		if (!EditorInterface.isNodeAList(editorState, beforeListNode)) return;

		// get the path of the other list to merge with
		const afterListNode = [beforeListNode[0] + 1];

		// check if afterListNode exists, and is a list
		if (
			!EditorInterface.getNode(editorState, afterListNode) ||
			!EditorInterface.isNodeAList(editorState, afterListNode)
		)
			return;

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
			afterListNode
		);

		// merge the two lists into one
		const mergedList = {
			type: beforeListNodeType,
			children: beforeListItems.concat(afterListItems),
		} as ListOrderedElement | ListUnorderedElement;

		// delete the two original lists
		EditorInterface.deleteNode(editorState, afterListNode);
		EditorInterface.deleteNode(editorState, beforeListNode);

		// insert the merged list into the editor
		EditorInterface.insertNode(editorState, mergedList, [beforeListNode[0]]);
	},
	//#endregion
};
