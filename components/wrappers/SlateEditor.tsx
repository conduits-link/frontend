import { Slate, Editable } from "slate-react";
import { Editor, Descendant } from "slate";
import React from "react";

import { renderElement, renderLeaf } from "@/utils/editor/render";

import NoSSR from "./NoSSR";
import { EditorUpdate } from "@/utils/editor/update";

const SlateEditor = ({
	editor,
	className,
	file,
	readOnly,
	mode,
}: {
	editor: Editor;
	className?: string;
	file: any;
	readOnly: boolean;
	mode: string;
}) => {
	return (
		<NoSSR>
			<Slate
				editor={editor}
				initialValue={file.body}
				onChange={(value: Descendant[]) =>
					EditorUpdate.onChange(value, editor)
				}
			>
				<Editable
					className={className}
					renderElement={(props) =>
						renderElement({ ...props }, editor, mode) || <></>
					}
					renderLeaf={(props) => renderLeaf({ ...props }, editor, mode)}
					onKeyDown={(e: React.KeyboardEvent) =>
						EditorUpdate.onType(e, editor)
					}
					readOnly={readOnly}
				/>
			</Slate>
		</NoSSR>
	);
};

export default SlateEditor;
