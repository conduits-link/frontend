import { ReactNode } from "react";

import styles from "./FillPage.module.css";

const FillPageComponent = ({
	loading,
	children,
}: {
	loading?: Boolean;
	children?: ReactNode;
}) => {
	return (
		<div className={styles.container}>
			{!loading && children}
			{loading && (
				<>
					<div className={styles.icon}>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div className={styles.message}>Rounding up the unicorns...</div>
				</>
			)}
		</div>
	);
};

export default FillPageComponent;
