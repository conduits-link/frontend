import styles from "./Loading.module.css";

const Component = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={styles.container}>
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
			{children}
		</div>
	);
};

export default Component;
