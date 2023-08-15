import { BiHeading } from "react-icons/bi";

import FormatButton from "./_FormatButton";

export default function Heading1FormatButton({
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
					className + " " + editor.isActive("heading", { level: 1 })
						? "is-active"
						: ""
				}
				onClick={() =>
					className +
					" " +
					editor.chain().focus().toggleHeading({ level: 1 }).run()
				}
			>
				<BiHeading />
				<sub>1</sub>
			</FormatButton>
		</div>
	);
}
