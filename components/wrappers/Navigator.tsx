import Link from "next/link";

import { BiSolidCoinStack, BiSolidFileBlank, BiUser } from "react-icons/bi";

import styles from "./Navigator.module.css";

const Navigator = ({
	selected,
	children,
}: {
	selected: "files" | "credits";
	children: React.ReactNode;
}) => {
	return (
		<div className={styles.containerMain}>
			<div className={styles.containerContent}>
				<div className={styles.containerLinks}>
					<div className={styles.account}>
						<BiUser />
						User
					</div>
					<Link
						href="/home"
						className={
							styles.link +
							" " +
							(selected === "files" ? styles.selected : "")
						}
					>
						<BiSolidFileBlank />
						Files
					</Link>
					<Link
						href="/credits"
						className={
							styles.link +
							" " +
							(selected === "credits" ? styles.selected : "")
						}
					>
						<BiSolidCoinStack />
						Credits
					</Link>
				</div>
				<div className={styles.content}>{children}</div>
			</div>
		</div>
	);
};

export default Navigator;
