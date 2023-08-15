import { BiHeading } from "react-icons/bi";

import FormatButton from "./_FormatButton";

export default function Heading2FormatButton({
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
					editor.isActive("heading", { level: 2 }) ? "is-active" : ""
				}
				onClick={() =>
					editor.chain().focus().toggleHeading({ level: 2 }).run()
				}
			>
				<BiHeading />
				<sub>2</sub>
			</FormatButton>
		</div>
	);
}
