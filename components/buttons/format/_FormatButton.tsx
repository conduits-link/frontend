import { ReactNode } from "react";

import Button from "../Button";

export default function StyleButton({
	classNameRef,
	onClickRef,
	children,
}: {
	classNameRef: string;
	onClickRef: React.MouseEventHandler;
	children: ReactNode;
}) {
	return (
		<Button classNameRef={classNameRef} onClickRef={onClickRef}>
			{children}
		</Button>
	);
}
