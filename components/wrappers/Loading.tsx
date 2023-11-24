import styles from "./Loading.module.css";

const Component = ({
	loader = true,
	children,
}: {
	loader?: boolean;
	children: React.ReactNode;
}) => {
	return (
		<div className={styles.container}>
			{loader && (
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
			)}
			{children}
		</div>
	);
};

export default Component;
