import { BiHeading } from "react-icons/bi";

import FormatButton from "./_FormatButton";

export default function Heading3FormatButton({
	editor,
	className,
}: {
	editor: any; // TODO: change this
	className: string;
}) {
	return (
		<div>
			<FormatButton
				className={
					editor.isActive("heading", { level: 3 }) ? "is-active" : ""
				}
				onClick={() =>
					editor.chain().focus().toggleHeading({ level: 3 }).run()
				}
			>
				<BiHeading />
				<sub>3</sub>
			</FormatButton>
		</div>
	);
}
