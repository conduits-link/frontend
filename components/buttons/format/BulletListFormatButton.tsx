import StyleButton from "./FormatButton";

export default function BulletListStyleButton({
	editor,
}: {
	editor: any; // TODO: change this
}) {
	return (
		<div>
			<StyleButton
				classNameRef={editor.isActive("bulletList") ? "is-active" : ""}
				onClickRef={() => editor.chain().focus().toggleBulletList().run()}
			>
				bullet list
			</StyleButton>
		</div>
	);
}
