import StyleButton from "./StyleButton";

export default function Heading2StyleButton({
	editor,
}: {
	editor: any; // TODO: change this
}) {
	return (
		<div>
			<StyleButton
				classNameRef={
					editor.isActive("heading", { level: 2 }) ? "is-active" : ""
				}
				onClickRef={() =>
					editor.chain().focus().toggleHeading({ level: 2 }).run()
				}
			>
				h2
			</StyleButton>
		</div>
	);
}
