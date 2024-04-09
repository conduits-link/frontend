"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import { FaEye, FaPenFancy, FaPlus, FaTrash } from "react-icons/fa6";

import { countWordsInObject } from "@/utils/parse";
import sendFetch from "@/utils/fetch";

import Button from "@/components/buttons/Button";
import Input from "../form/Input";
import NoSSR from "./NoSSR";

import styles from "./Store.module.css";

const StoreComponent = ({ initialFiles }: { initialFiles: any }) => {
	const router = useRouter();

	const [files, setFiles] = useState(initialFiles);
	const [filteredFiles, setFilteredFiles] = useState(files);

	function searchFiles(search: string) {
		setFilteredFiles(
			files.filter((doc: doc) => doc.title.toLowerCase().includes(search))
		);
	}

	async function createDoc() {
		const res = (await sendFetch(
			`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/store/docs`,
			"POST",
			"",
			{
				doc: {
					title: "Untitled",
					body: [
						{
							type: "paragraph",
							children: [{ type: "text", children: [{ text: "" }] }],
						},
					],
				},
			}
		)) as apiResponse;

		router.push(`/edit/${res.body.doc.uid}`);
	}

	async function deleteDoc(id: string) {
		const res = (await sendFetch(
			`${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/store/docs/${id}`,
			"DELETE",
			""
		)) as apiResponse;

		if (res.response.status === 200) {
			setFiles(files.filter((doc: doc) => doc.uid !== id));
			setFilteredFiles(filteredFiles.filter((doc: doc) => doc.uid !== id));
		}
	}

	return (
		<NoSSR>
			<div className={styles.container}>
				<div className={styles.page}>
					<div className={styles.heading}>
						<h1>Files</h1>
						<Input
							name="search"
							type="text"
							placeholder="Search"
							onChange={(e) => searchFiles(e.target.value)}
						/>
						<Button primary={true} onClick={createDoc}>
							<FaPlus />
						</Button>
					</div>
					<div className={styles.containerFiles}>
						<div className={styles.files}>
							{filteredFiles.map((doc: doc, i: number) => {
								const words = countWordsInObject(doc.body);

								return (
									<div className={styles.file} key={i}>
										<div className={styles.fileInfo}>
											<h3>{doc.title}</h3>
											<p>
												<span className={styles.fileInfoType}>
													Document •{" "}
												</span>
												<span className={styles.fileInfoWords}>
													{words} {words === 1 ? "word" : "words"}
												</span>
											</p>
										</div>
										<div className={styles.fileButtons}>
											<Link href={`/edit/${doc.uid}`}>
												<button className={styles.button}>
													<FaPenFancy />
												</button>
											</Link>
											<Link href={`/edit/${doc.uid}?mode=preview`}>
												<button className={styles.button}>
													<FaEye />
												</button>
											</Link>
											<button
												onClick={() => deleteDoc(doc.uid)}
												className={styles.button}
											>
												<FaTrash />
											</button>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</NoSSR>
	);
};

export default StoreComponent;
