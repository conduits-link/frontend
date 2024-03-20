import { Descendant, Editor } from "slate";
//                ^^^ remove non-Editor imports

import { EditorInterface, LIST_TYPES } from "./slate";

export const EditorUpdate = {
	onType(e: React.KeyboardEvent, editor: Editor) {
		switch (e.key) {
			case "Enter": {
				e.preventDefault();

				// get the outer parent node of the current selection
				const containerNode = EditorInterface.getSelectedRootNode(editor);
				if (!containerNode) break;
				const {
					node: rootNode,
					index: rootNodeIndex,
					path: rootNodePath,
				} = containerNode;

				// get index of cursor inside node
				const { index: cursorOffset, path: cursorPath } =
					EditorInterface.getCursorPosition(editor);

				let insertPath = [rootNodeIndex + 1];

				let nodeContent = EditorInterface.getNodeContent(rootNode);
				if (LIST_TYPES.includes(EditorInterface.getNodeType(rootNode))) {
					nodeContent = EditorInterface.getNodeContent(
						EditorInterface.getNodeAtPosition(editor, [
							rootNodeIndex,
							EditorInterface.getIndexOfCurrentListItem(editor),
						])
					);
				}

				EditorInterface.insertText(
					editor,
					nodeContent.slice(0, cursorOffset),
					cursorPath
				);

				let newItem = EditorInterface.generateNewNode(
					"paragraph",
					nodeContent.substring(cursorOffset, nodeContent.length)
				);

				// if not at the end of a list, insert a new list item between the current and next list item
				if (
					LIST_TYPES.includes(EditorInterface.getNodeType(rootNode)) &&
					EditorInterface.getIndexOfCurrentListItem(editor) <
						EditorInterface.getNumberOfListItems(rootNode) &&
					!!nodeContent
				) {
					insertPath = [
						rootNodeIndex,
						EditorInterface.getIndexOfCurrentListItem(editor) + 1,
					];
					newItem = EditorInterface.generateNewNode(
						EditorInterface.getListItemType(rootNode),
						nodeContent.substring(cursorOffset, nodeContent.length)
					);
				}

				EditorInterface.insertNode(editor, newItem, insertPath);
				EditorInterface.setCursor(editor, insertPath);

				break;
			}
		}

		if (e.ctrlKey) {
			switch (e.key) {
				case "b": {
					e.preventDefault();
					EditorInterface.toggleMark(editor, "bold");
					break;
				}
				case "i": {
					e.preventDefault();
					EditorInterface.toggleMark(editor, "italic");
					break;
				}
				case "~": {
					e.preventDefault();
					EditorInterface.toggleMark(editor, "strikethrough");
					break;
				}
				case "`": {
					e.preventDefault();
					EditorInterface.toggleMark(editor, "code");
					break;
				}
			}
		}
	},
	onChange(value: Descendant[], editor: Editor) {
		// check if there are adjacent lists and merge them
		for (let i = 0; i < value.length; i++) {
			const node = value[i];
			const nextNode = value[i + 1];
			const nodeType = EditorInterface.getNodeType(node);
			const nextNodeType = EditorInterface.getNodeType(nextNode);

			if (LIST_TYPES.includes(nodeType) && nodeType === nextNodeType) {
				EditorInterface.mergeLists(editor, i);
				return;
			}
		}
	},
};
