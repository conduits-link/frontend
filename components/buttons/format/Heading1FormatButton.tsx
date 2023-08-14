import { BiHeading } from "react-icons/bi";

import StyleButton from "./_FormatButton";

export default function Heading1StyleButton({
	editor,
}: {
	editor: any; // TODO: change this
}) {
	return (
		<div>
			<StyleButton
				classNameRef={
					editor.isActive("heading", { level: 1 }) ? "is-active" : ""
				}
				onClickRef={() =>
					editor.chain().focus().toggleHeading({ level: 1 }).run()
				}
			>
				<BiHeading /><sub>1</sub>
			</StyleButton>
		</div>
	);
}
