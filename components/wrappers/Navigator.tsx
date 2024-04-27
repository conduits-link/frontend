import Link from "next/link";

import {
	BiSolidChat,
	BiSolidCoinStack,
	BiSolidFileBlank,
} from "react-icons/bi";

import styles from "./Navigator.module.css";

const Navigator = ({
	selected,
	children,
}: {
	selected: "files" | "prompts" | "credits" | "settings";
	children: React.ReactNode;
}) => {
	return (
		<div className={styles.containerMain}>
			<div className={styles.containerContent}>
				<div className={styles.content}>{children}</div>
				<div className={styles.containerNav}>
					<div className={styles.containerLinks}>
						<Link
							href="/"
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
							href="/prompts"
							className={
								styles.link +
								" " +
								(selected === "prompts" ? styles.selected : "")
							}
						>
							<BiSolidChat />
							Prompts
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
					{/* <div className={styles.account}>
						<BiUser />
						User
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default Navigator;
