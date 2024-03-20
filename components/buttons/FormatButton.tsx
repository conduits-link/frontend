import { ReactNode, useEffect, useState } from "react";

import { Editor } from "slate";

import Button from "./Button";
import { useModal } from "@/contexts/modal";
import { EditorInterface } from "@/utils/editor/slate";

export default function FormatButton({
	editor,
	isNode,
	type,
	options,
	appendNode,
	promptOption,
	className,
	onClick,
	onMouseEnter,
	onMouseOver,
	onMouseDown,
	onMouseUp,
	onMouseLeave,
	onFocus,
	onBlur,
	children,
}: {
	editor: Editor;
	isNode: Boolean;
	type: string;
	options?: any;
	appendNode?: boolean;
	promptOption?: "url";
	className?: string;
	onClick?: React.MouseEventHandler;
	onMouseEnter?: React.MouseEventHandler;
	onMouseOver?: React.MouseEventHandler;
	onMouseDown?: React.MouseEventHandler;
	onMouseUp?: React.MouseEventHandler;
	onMouseLeave?: React.MouseEventHandler;
	onFocus?: React.FocusEventHandler;
	onBlur?: React.FocusEventHandler;
	children: ReactNode;
}) {
	const { showModal } = useModal();

	const [url, setUrl] = useState<string>("");

	const getUrlFromModal = () => {
		showModal("url", "Enter a URL", "Enter a URL to link to.", setUrl);
	};

	const updateNode = (e: React.MouseEvent | null) => {
		let newOptions = options || {};

		switch (promptOption) {
			case "url":
				newOptions = {
					...newOptions,
					url,
				};

				break;
		}

		if (appendNode)
			switch (type) {
				case "image":
					let newItem = {
						type: "image",
						...newOptions,
					};
					EditorInterface.appendBlock(
						newItem,
						editor,
						undefined,
						newOptions
					);
					break;
			}
		else if (isNode)
			EditorInterface.toggleBlock(type, editor, undefined, newOptions);
		else EditorInterface.toggleMark(editor, type, newOptions);

		if (e && onMouseDown) onMouseDown(e);
	};

	useEffect(() => {
		if (promptOption) updateNode(null);
	}, [url]);

	return (
		<Button
			className={className}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseOver={onMouseOver}
			onMouseDown={(e) => {
				e.preventDefault();

				if (promptOption) {
					switch (promptOption) {
						case "url":
							getUrlFromModal();
							break;
					}
				} else updateNode(e);
			}}
			onMouseUp={onMouseUp}
			onMouseLeave={onMouseLeave}
			onFocus={onFocus}
			onBlur={onBlur}
		>
			{children}
		</Button>
	);
}
