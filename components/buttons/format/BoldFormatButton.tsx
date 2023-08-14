import StyleButton from "./FormatButton";

export default function BoldStyleButton({
	editor,
}: {
	editor: any; // TODO: change this
}) {
	return (
		<div>
			<StyleButton
				classNameRef={editor.isActive("bold") ? "is-active" : ""}
				onClickRef={() => editor.chain().focus().toggleBold().run()}
			>
				bold
			</StyleButton>
		</div>
	);
}
