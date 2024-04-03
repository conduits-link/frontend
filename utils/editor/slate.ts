import { Editor, Transforms, Element } from "slate";
import { ReactEditor } from "slate-react";
import { BaseEditor } from "slate";

//#region Types and interfaces

type FormattedText = {
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	code?: boolean;
	link?: string;
	text: string;
};

type CustomText = FormattedText;

type Idea = {
	text: string;
};

enum ListType {
	Ordered = "list-ordered",
	Unordered = "list-unordered",
}

enum ListItemType {
	OrderedItem = `${ListType.Ordered}-item`,
	UnorderedItem = `${ListType.Unordered}-item`,
}

enum ElementType {
	Paragraph = "paragraph",
	Heading = "heading",
	ListOrdered = ListType.Ordered,
	ListOrderedItem = ListItemType.OrderedItem,
	ListUnordered = ListType.Unordered,
	ListUnorderedItem = ListItemType.UnorderedItem,
	Blockquote = "blockquote",
	Code = "code",
	Image = "image",
}

type ParagraphElement = {
	type: ElementType.Paragraph;
	children: CustomText[];
	ideas: Idea[];
};

type HeadingElement = {
	type: ElementType.Heading;
	level: number;
	children: CustomText[];
	ideas: Idea[];
};

type ListOrderedItemElement = {
	type: ListItemType.OrderedItem;
	children: CustomText[];
};

type ListOrderedElement = {
	type: ListType.Ordered;
	children: ListOrderedItemElement[];
	ideas: Idea[];
};

type ListUnorderedItemElement = {
	type: ListItemType.UnorderedItem;
	children: CustomText[];
};

type ListUnorderedElement = {
	type: ListType.Unordered;
	children: ListUnorderedItemElement[];
	ideas: Idea[];
};

type BlockquoteElement = {
	type: ElementType.Blockquote;
	children: CustomText[];
	ideas: Idea[];
};

type CodeblockElement = {
	type: ElementType.Code;
	children: CustomText[];
	ideas: Idea[];
};

type ImageElement = {
	type: ElementType.Image;
	url: string;
	alt: string;
};

type CustomElement =
	| ParagraphElement
	| HeadingElement
	| ListOrderedElement
	| ListOrderedItemElement
	| ListUnorderedElement
	| ListUnorderedItemElement
	| BlockquoteElement
	| CodeblockElement
	| ImageElement;

declare module "slate" {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: CustomElement;
		CustomElement: CustomElement;
		Text: CustomText;
	}
}

//#endregion

// TODO: make sure options are removed from a node if not applicable to that node type

// TODO: add types for both Elements and Element types everywhere in this file

// TODO: make types available for node components

// TODO: change string types to enums

// TODO: make node options more robust

// TODO: vals that can be node path or string should be overloaded as don't need editorState if just string

export namespace EditorInterface {
	//#region Core interfaces

	export function getNode(editorState: Editor, path: number[]): CustomElement;
	export function getNode(editorState: Editor, node: CustomElement): number[];
	export function getNode(
		editorState: Editor,
		pathOrNode: number[] | CustomElement
	): CustomElement | number[] {
		if (Array.isArray(pathOrNode)) {
			return Editor.node(editorState, pathOrNode)[0] as CustomElement;
		} else {
			return ReactEditor.findPath(editorState, pathOrNode);
		}
	}

	export function getSelectedRootNode(editorState: Editor): {
		node: CustomElement | null;
		index: number;
	} {
		const selection = editorState.selection;

		if (selection) {
			const nodeIndex = selection.anchor.path[0];
			const node = Editor.node(editorState, [nodeIndex])[0] as CustomElement;

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
	export function getNodeType(node: CustomElement): string;
	export function getNodeType(
		arg1: Editor | CustomElement,
		path?: number[]
	): string {
		let node: CustomElement;

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
	): {
		node: CustomElement;
		path: number[];
	} {
		const parentPath = path.slice(0, -1);
		const parent = EditorInterface.getNode(editorState, parentPath);
		return { node: parent, path: parentPath };
	}

	export function getNodeChildren(
		editorState: Editor,
		path: number[]
	): CustomElement[] {
		const node = EditorInterface.getNode(editorState, path) as CustomElement;

		// if node is not an image or list item, return the children
		if (node.type !== ElementType.Image ||
			node.type !== ListItemType.OrderedItem ||
			node.type !== ListItemType.UnorderedItem
			) {
			return node.children as CustomElement[];
		} 

		return [];
	}

	export function getNodeContent(editorState: Editor, path: number[]): string {
		// TODO: make issues with if has multiple children more robust
		const node = EditorInterface.getNode(editorState, path);
		return CustomElement.string(node);
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
		node: CustomElement,
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
		content: string,
		options?: any
	): CustomElement {
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
			...options,
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
		Transforms.collapse(editorState, { edge: "end" });
	}
	//#endregion

	//#region List interfaces
	export function isNodeAList(
		editorState: Editor,
		val: number[] | string
	): boolean {
		if (typeof val === "string")
			return Object.values(ListType).includes(val as ListType);
		return Object.values(ListType).includes(
			EditorInterface.getNodeType(editorState, val) as ListType
		);
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
		if (typeof val === "string")
			return Object.values(ListItemType).includes(val as ListItemType);
		return Object.values(ListItemType).includes(
			EditorInterface.getNodeType(editorState, val) as ListItemType
		);
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
		if (!parent.node) return false;

		if (EditorInterface.isNodeAList(editorState, parent.path)) return true;
		return false;
	}

	export function insertListWrapper(
		editorState: Editor,
		node: number[],
		type: ListType
	): void {
		// check that the node at node is a list item
		if (!EditorInterface.isNodeAListItem(editorState, node)) return;

		Transforms.wrapNodes(
			editorState,
			{ type: type, children: [], ideas: [] },
			{ at: node }
		);
	}
	//#endregion
}
