import { ReactNode } from "react";

export default function Button({
	classNameRef,
	onClickRef,
	children,
}: {
	classNameRef: string;
	onClickRef: React.MouseEventHandler;
	children: ReactNode;
}) {
	return (
		<div>
			<button className={classNameRef} onClick={onClickRef}>
				{children}
			</button>
		</div>
	);
}
