import { ReactNode } from "react";

import Button from "./Button";

export default function FormatButton({
	className,
	onClick,
	children,
}: {
	className: string;
	onClick: React.MouseEventHandler;
	children: ReactNode;
}) {
	return (
		<Button className={className} onClick={onClick}>
			{children}
		</Button>
	);
}
