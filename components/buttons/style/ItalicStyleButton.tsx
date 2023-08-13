import StyleButton from "./StyleButton";

export default function ItalicStyleButton({
	editor,
}: {
	editor: any; // TODO: change this
}) {
	return (
		<div>
			<StyleButton
				classNameRef={editor.isActive("italic") ? "is-active" : ""}
				onClickRef={() => editor.chain().focus().toggleItalic().run()}
			>
				italic
			</StyleButton>
		</div>
	);
}
