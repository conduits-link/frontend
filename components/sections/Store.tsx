"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import { FaEye, FaPenFancy, FaPlus, FaTrash } from "react-icons/fa6";

import { wrapFetch } from "@/utils/fetch";
import { countWordsInObject } from "@/utils/parse";
import { useFlashMessage } from "@/utils/flash";

import Button from "@/components/buttons/Button";
import Input from "../form/Input";
import NoSSR from "../wrappers/NoSSR";

import styles from "./Store.module.css";

const StoreComponent = ({ initialFiles }: { initialFiles: any }) => {
	const router = useRouter();
	const { showFlashMessage } = useFlashMessage();

	const [files, setFiles] = useState(initialFiles);
	const [filteredFiles, setFilteredFiles] = useState(files);

	function searchFiles(search: string) {
		setFilteredFiles(
			files.filter((doc: doc) => doc.title.toLowerCase().includes(search))
		);
	}

	async function createDoc() {
		const { response, body } = (await wrapFetch(
			{
				route: `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/store/docs`,
				method: "POST",
				cookie: "",
				data: {
					doc: {
						title: "Untitled",
						body: [
							{
								type: "paragraph",
								children: [{ type: "text", children: [{ text: "" }] }],
							},
						],
					},
				},
			},
			showFlashMessage
		)) as apiResponse;

		router.push(`/${body.doc.uid}`);
	}

	async function deleteDoc(id: string) {
		const { response, body } = (await wrapFetch(
			{
				route: `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/store/docs/${id}`,
				method: "DELETE",
				cookie: "",
			},
			showFlashMessage
		)) as apiResponse;

		if (response.ok) {
			setFiles(files.filter((doc: doc) => doc.uid !== id));
			setFilteredFiles(filteredFiles.filter((doc: doc) => doc.uid !== id));
		}
	}

	return (
		<NoSSR>
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
										<Link href={`/${doc.uid}`}>
											<button className={styles.button}>
												<FaPenFancy />
											</button>
										</Link>
										<Link href={`/${doc.uid}?mode=preview`}>
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
		</NoSSR>
	);
};

export default StoreComponent;
