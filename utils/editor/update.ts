import { Descendant, Editor } from "slate";
//                ^^^ remove non-Editor imports

import { EditorInterface, LIST_TYPES } from "./slate";

export const EditorUpdate = {
	onType(e: React.KeyboardEvent, editorState: Editor) {
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

				// get the (text) content of the current selected node
				let nodeContent = EditorInterface.getNodeContent(rootNode);
				if (EditorInterface.nodeIsList(rootNode)) {
					const indexOfSelectedListItem =
						EditorInterface.getIndexOfCurrentListItem(editorState);
					const selectedListItem = EditorInterface.getNodeAtPosition(
						editorState,
						[rootNodeIndex, indexOfSelectedListItem]
					);
					nodeContent = EditorInterface.getNodeContent(selectedListItem);
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
					"paragraph",
					nodeContent.substring(cursorOffset, nodeContent.length)
				);

				// if a list item with content before the cursor is selected,
				// update the new node to be a new list item
				if (
					EditorInterface.nodeIsList(rootNode) &&
					!!nodeContent.substring(0, cursorOffset)
				) {
					insertPath = [
						rootNodeIndex,
						EditorInterface.getIndexOfCurrentListItem(editorState) + 1,
					];
					newItem = EditorInterface.generateNewNode(
						EditorInterface.getListItemType(rootNode),
						nodeContent.substring(cursorOffset, nodeContent.length)
					);
				}
				// if a list item without content is selected, split the list
				else if (EditorInterface.nodeIsList(rootNode) && !nodeContent) {
					EditorInterface.splitList(
						editorState,
						rootNodeIndex,
						EditorInterface.getIndexOfCurrentListItem(editorState),
						"paragraph"
					);
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
					EditorInterface.toggleMark(editorState, "bold");
					break;
				}
				case "i": {
					e.preventDefault();
					EditorInterface.toggleMark(editorState, "italic");
					break;
				}
				case "~": {
					e.preventDefault();
					EditorInterface.toggleMark(editorState, "strikethrough");
					break;
				}
				case "`": {
					e.preventDefault();
					EditorInterface.toggleMark(editorState, "code");
					break;
				}
			}
		}
	},
	onChange(value: Descendant[], editorState: Editor) {
		// check if there are adjacent lists and merge them
		for (let i = 0; i < value.length; i++) {
			const node = value[i];
			const nextNode = value[i + 1];
			const nodeType = EditorInterface.getNodeType(node);
			const nextNodeType = EditorInterface.getNodeType(nextNode);

			if (LIST_TYPES.includes(nodeType) && nodeType === nextNodeType) {
				EditorInterface.mergeLists(editorState, i);
				return;
			}
		}
	},
};
