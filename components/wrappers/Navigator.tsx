import Link from "next/link";

import {
	BiSolidChat,
	BiSolidCog,
	BiSolidCoinStack,
	BiSolidFileBlank,
	BiUser,
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
					<div className={styles.account}>
						<BiUser />
						User
					</div>
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
						<Link
							href="/settings"
							className={
								styles.link +
								" " +
								(selected === "settings" ? styles.selected : "")
							}
						>
							<BiSolidCog />
							Settings
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navigator;
