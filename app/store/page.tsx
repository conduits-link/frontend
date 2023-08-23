import Link from "next/link";

import styles from "./page.module.css";

export default function Store() {
	return (
		<>
			<div>look at all your documents!</div>
			<div>
				<Link href={"/edit"}>Edit one here</Link>
			</div>
		</>
	);
}
