import React, { EventHandler, MouseEventHandler } from "react";

const Idea = ({
	children,
	key,
}: {
	children: React.ReactNode;
	key: number;
}) => {
	return <div key={key}>{children}</div>;
};

export default Idea;
