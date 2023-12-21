import React, { useEffect, useState } from "react";

import styles from "./FlashMessage.module.css";

const FlashMessage = ({ message, type }: { message: string; type: string }) => {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShow(false);
		}, 5000);
		return () => {
			clearTimeout(timeout);
		};
	}, []);

	const getStyles = () => {
		if (show)
			return styles.container + " " + styles[type] + " " + styles.show;
		return styles.container + " " + styles[type];
	};

	return <div className={getStyles()}>{message}</div>;
};

export default FlashMessage;
