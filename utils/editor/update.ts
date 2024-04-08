import { Descendant, Editor } from "slate";

import { CustomElement, EditorInterface, ElementType } from "./slate";
import { EditorOperate } from "./operate";

export const EditorUpdate = {
	// when a user presses a key, while the editor is focused
	onType(e: React.KeyboardEvent, editorState: Editor): void {
		switch (e.key) {
			case "Enter": {
				e.preventDefault();

				// get the outer parent node of the current selection
				const containerNode =
					EditorInterface.getSelectedRootNode(editorState);
				if (!containerNode) break;
				const { node: rootNode, index: rootNodeIndex } = containerNode;

				// get index of the cursor within the node
				const { index: cursorOffset, path: cursorPath } =
					EditorInterface.getCursorPosition(editorState);
				const rootNodePath = [rootNodeIndex];

				// get the (text) content of the current selected node
				let nodeContent = EditorInterface.getNodeContent(
					editorState,
					rootNodePath
				);
				if (EditorInterface.isNodeAList(editorState, rootNodePath)) {
					const indexOfSelectedListItem =
						EditorInterface.getIndexOfCurrentListItem(editorState);
					nodeContent = EditorInterface.getNodeContent(editorState, [
						rootNodeIndex,
						indexOfSelectedListItem,
					]);
				}

				// replace the current node with the content before the cursor
				EditorInterface.insertText(
					editorState,
					nodeContent.slice(0, cursorOffset),
					cursorPath
				);

				// create the default new node and insert it after the current node
				let insertPath = [rootNodeIndex + 1];
				let newItem = EditorInterface.generateNewNode(
					ElementType.Paragraph,
					nodeContent.substring(cursorOffset, nodeContent.length)
				);

				// if a list item with content before the cursor is selected,
				// update the new node to be a new list item
				if (
					EditorInterface.isNodeAList(editorState, rootNodePath) &&
					!!nodeContent.substring(0, cursorOffset)
				) {
					insertPath = [
						rootNodeIndex,
						EditorInterface.getIndexOfCurrentListItem(editorState) + 1,
					];
					const listItemType =
						EditorInterface.getNodeType(editorState, rootNodePath) ===
						ElementType.ListOrdered
							? ElementType.ListOrderedItem
							: ElementType.ListUnorderedItem;
					newItem = EditorInterface.generateNewNode(
						listItemType,
						nodeContent.substring(cursorOffset, nodeContent.length)
					);
				}
				// if a list item without content is selected, split the list
				else if (
					EditorInterface.isNodeAList(editorState, rootNodePath) &&
					!nodeContent
				) {
					EditorOperate.splitList(editorState, [
						rootNodeIndex,
						EditorInterface.getIndexOfCurrentListItem(editorState),
					]);
				}

				// insert the new node and set the cursor to it
				EditorInterface.insertNode(editorState, newItem, insertPath);
				EditorInterface.setCursor(editorState, insertPath);

				break;
			}
		}

		if (e.ctrlKey) {
			switch (e.key) {
				case "b": {
					e.preventDefault();
					EditorOperate.toggleMark(editorState, "bold");
					break;
				}
				case "i": {
					e.preventDefault();
					EditorOperate.toggleMark(editorState, "italic");
					break;
				}
				case "~": {
					e.preventDefault();
					EditorOperate.toggleMark(editorState, "strikethrough");
					break;
				}
				case "`": {
					e.preventDefault();
					EditorOperate.toggleMark(editorState, "code");
					break;
				}
			}
		}
	},
	// when the state of the editor changes, for any reason
	onChange(nodes: Descendant[], editorState: Editor): void {
		// check if there are adjacent lists and merge them
		for (let i = 0; i < nodes.length - 1; i++) {
			const currentNodeType = EditorInterface.getNodeType(
				nodes[i] as CustomElement
			);
			const nextNodeType = EditorInterface.getNodeType(
				nodes[i + 1] as CustomElement
			);

			if (
				currentNodeType &&
				EditorInterface.isNodeAList(editorState, currentNodeType) &&
				currentNodeType === nextNodeType
			) {
				const beforeListLength = EditorInterface.getNodeChildren(
					editorState,
					[i]
				).length;
				EditorOperate.mergeLists(editorState, [i]);
				EditorInterface.setCursor(editorState, [i, beforeListLength - 1]);
				return;
			}
		}
	},
};
