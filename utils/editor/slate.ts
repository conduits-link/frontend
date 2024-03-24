import { Editor, Transforms, Node, Element } from "slate";
import { ReactEditor } from "slate-react";
import { BaseEditor } from "slate";

type CustomElement = {
	type: string;
	children: Node[] | CustomElement[] | CustomText[];
};

type CustomText = { text: string };

declare module "slate" {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: CustomElement;
		Node: CustomElement;
		Text: CustomText;
	}
}

const LIST_ITEMS = ["list-ordered-item", "list-unordered-item"];
const LIST_TYPES = ["list-ordered", "list-unordered"];

// TODO: make sure options are removed from a node if not applicable to that node type

// TODO: add types for both Elements and Element types everywhere in this file

// TODO: make types available for node components

// TODO: change string types to enums

// TODO: make node options more robust

// TODO: vals that can be node path or string should be overloaded as don't need editorState if just string

export namespace EditorInterface {
	//#region Core interfaces

	export function getNode(editorState: Editor, path: number[]): Node;
	export function getNode(editorState: Editor, node: Node): number[];
	export function getNode(
		editorState: Editor,
		pathOrNode: number[] | Node
	): Node | number[] {
		if (Array.isArray(pathOrNode)) {
			return Editor.node(editorState, pathOrNode)[0];
		} else {
			return ReactEditor.findPath(editorState, pathOrNode);
		}
	}

	export function getSelectedRootNode(editorState: Editor): {
		node: Node | null;
		index: number;
	} {
		const selection = editorState.selection;

		if (selection) {
			const nodeIndex = selection.anchor.path[0];
			const node = Editor.node(editorState, [nodeIndex])[0];

			return {
				node: node,
				index: nodeIndex,
			};
		}

		return {
			node: null,
			index: -1,
		};
	}

	function isEditor(arg: any): arg is Editor {
		return arg && typeof arg === "object" && "apply" in arg;
	}

	export function getNodeType(editorState: Editor, path: number[]): string;
	export function getNodeType(node: Node): string;
	export function getNodeType(arg1: Editor | Node, path?: number[]): string {
		let node: Node;

		if (isEditor(arg1)) {
			if (path === undefined) {
				throw new Error(
					"Path must be provided when the first argument is an Editor"
				);
			}
			node = EditorInterface.getNode(arg1, path);
		} else {
			node = arg1;
		}

		if (!node || !Element.isElement(node)) return "";
		return node.type;
	}

	export function getNodeParent(
		editorState: Editor,
		path: number[]
	): Node | null {
		const parentPath = path.slice(0, -1);
		return EditorInterface.getNode(editorState, parentPath);
	}

	export function getNodeChildren(
		editorState: Editor,
		path: number[]
	): Node[] {
		const node = EditorInterface.getNode(editorState, path);
		return Array.from(Node.children(node, [])).map(([node]) => node);
	}

	export function getNodeContent(editorState: Editor, path: number[]): string {
		// TODO: make issues with if has multiple children more robust
		const node = EditorInterface.getNode(editorState, path);
		return Node.string(node);
	}

	export function setNodeType(
		editorState: Editor,
		path: number[],
		type: string,
		options?: any
	): void {
		// TODO: need to remove options if not applicable to the new node type
		const node = EditorInterface.getNode(editorState, path);
		Transforms.setNodes(
			editorState,
			{ type: type, ...options },
			{ at: ReactEditor.findPath(editorState, node) }
		);
	}

	export function insertNode(
		editorState: Editor,
		node: Node,
		path: number[]
	): void {
		// Insert the new sub-item node at the end of the container's children
		Transforms.insertNodes(editorState, node, {
			at: path,
		});
	}

	export function insertText(
		editorState: Editor,
		content: string,
		path: number[]
	): void {
		Transforms.insertText(editorState, content, {
			at: path,
		});
	}

	export function deleteNode(editorState: Editor, node: number[]): void {
		Transforms.removeNodes(editorState, {
			at: node,
		});
	}

	export function generateNewNode(
		parentType: string,
		childType: string,
		content: string
	): Node {
		return {
			type: parentType,
			children: [
				{
					type: childType,
					children: [
						{
							text: content,
						},
					],
				},
			],
		};
	}

	export function isMarkActive(
		editorState: Editor,
		markType: string
	): boolean {
		const marks = Editor.marks(editorState);
		// TODO: make mark type more robust
		return marks ? (marks as any)[markType] === true : false;
	}
	//#endregion

	//#region Cursor and selection interfaces
	export function getCursorPosition(editorState: Editor): {
		index: number;
		path: number[];
	} {
		const selection = editorState.selection;
		if (selection) {
			return { index: selection.anchor.offset, path: selection.anchor.path };
		}
		return {
			index: -1,
			path: [],
		};
	}

	export function setCursor(editorState: Editor, path: number[]): void {
		Transforms.select(editorState, path);
		Transforms.collapse(editorState, { edge: "start" });
	}
	//#endregion

	//#region List interfaces
	export function isNodeAList(
		editorState: Editor,
		val: number[] | string
	): boolean {
		if (typeof val === "string") return LIST_TYPES.includes(val);
		return LIST_TYPES.includes(EditorInterface.getNodeType(editorState, val));
	}

	export function getCorrespondingListType(
		editorState: Editor,
		val: number[] | string
	): string {
		if (typeof val === "string") {
			if (val === "list-ordered-item") return "list-ordered";
			if (val === "list-unordered-item") return "list-unordered";
		} else {
			if (
				EditorInterface.getNodeType(editorState, val) ===
				"list-ordered-item"
			)
				return "list-ordered";
			if (
				EditorInterface.getNodeType(editorState, val) ===
				"list-unordered-item"
			)
				return "list-unordered";
		}
		return "";
	}

	export function isNodeAListItem(
		editorState: Editor,
		val: number[] | string
	): boolean {
		if (typeof val === "string") return LIST_ITEMS.includes(val);
		return LIST_ITEMS.includes(EditorInterface.getNodeType(editorState, val));
	}

	export function getCorrespondingListItemType(
		editorState: Editor,
		val: number[] | string
	): string {
		if (typeof val === "string") {
			if (val === "list-ordered") return "list-ordered-item";
			if (val === "list-unordered") return "list-unordered-item";
		} else {
			if (EditorInterface.getNodeType(editorState, val) === "list-ordered")
				return "list-ordered-item";
			if (EditorInterface.getNodeType(editorState, val) === "list-unordered")
				return "list-unordered-item";
		}
		return "";
	}

	export function getIndexOfCurrentListItem(editorState: Editor): number {
		// if root node is a list, return the index of the current list item
		const rootNode = EditorInterface.getSelectedRootNode(editorState);
		if (
			rootNode &&
			EditorInterface.isNodeAList(editorState, [rootNode.index])
		) {
			const cursorPath = EditorInterface.getCursorPosition(editorState).path;
			return cursorPath[1];
		}
		return -1;
	}

	export function isNodeWrappedInList(
		editorState: Editor,
		path: number[]
	): boolean {
		const parent = EditorInterface.getNodeParent(editorState, path);
		if (!parent) return false;
		const parentPath = EditorInterface.getNode(editorState, parent);

		if (EditorInterface.isNodeAList(editorState, parentPath)) return true;
		return false;
	}

	export function insertListWrapper(
		editorState: Editor,
		node: number[],
		type: string
	): void {
		Transforms.wrapNodes(
			editorState,
			{ type: type, children: [] },
			{ at: node }
		);
	}
	//#endregion
}
