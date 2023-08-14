import StyleButton from "./FormatButton";

export default function CodeBlockStyleButton({
	editor,
}: {
	editor: any; // TODO: change this
}) {
	return (
		<div>
			<StyleButton
				classNameRef={editor.isActive("codeBlock") ? "is-active" : ""}
				onClickRef={() => editor.chain().focus().toggleCodeBlock().run()}
			>
				code block
			</StyleButton>
		</div>
	);
}
