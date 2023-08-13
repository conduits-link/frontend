import StyleButton from "./StyleButton";

export default function Heading3StyleButton({
	editor,
}: {
	editor: any; // TODO: change this
}) {
	return (
		<div>
			<StyleButton
				classNameRef={
					editor.isActive("heading", { level: 3 }) ? "is-active" : ""
				}
				onClickRef={() =>
					editor.chain().focus().toggleHeading({ level: 3 }).run()
				}
			>
				h3
			</StyleButton>
		</div>
	);
}
