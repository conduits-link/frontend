import { BiHeading } from "react-icons/bi";

import StyleButton from "./_FormatButton";

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
				<BiHeading /><sub>3</sub>
			</StyleButton>
		</div>
	);
}
