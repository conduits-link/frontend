import StyleButton from "./StyleButton";

export default function OrderedListStyleButton({
	editor,
}: {
	editor: any; // TODO: change this
}) {
	return (
		<div>
			<StyleButton
				classNameRef={editor.isActive("orderedList") ? "is-active" : ""}
				onClickRef={() => editor.chain().focus().toggleOrderedList().run()}
			>
				ordered list
			</StyleButton>
		</div>
	);
}
