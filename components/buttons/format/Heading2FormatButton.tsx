import { BiHeading } from "react-icons/bi";

import StyleButton from "./_FormatButton";

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
				<BiHeading /><sub>2</sub>
			</StyleButton>
		</div>
	);
}
