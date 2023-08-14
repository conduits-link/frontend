import StyleButton from "./FormatButton";

export default function CodeStyleButton({
	editor,
}: {
	editor: any; // TODO: change this
}) {
	return (
		<div>
			<StyleButton
				classNameRef={editor.isActive("code") ? "is-active" : ""}
				onClickRef={() => editor.chain().focus().toggleCode().run()}
			>
				code
			</StyleButton>
		</div>
	);
}
