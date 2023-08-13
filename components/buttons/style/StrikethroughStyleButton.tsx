import StyleButton from "./StyleButton";

export default function StrikethroughStyleButton({
	editor,
}: {
	editor: any; // TODO: change this
}) {
	return (
		<div>
			<StyleButton
				classNameRef={editor.isActive("strikethrough") ? "is-active" : ""}
				onClickRef={() =>
					editor.chain().focus().toggleStrikethrough().run()
				}
			>
				strikethrough
			</StyleButton>
		</div>
	);
}
