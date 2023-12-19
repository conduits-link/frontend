"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import { FaEye, FaPenFancy, FaPlus } from "react-icons/fa6";

import { countWordsInObject } from "@/utils/parse";
import sendFetch from "@/utils/fetch";

import Button from "@/components/buttons/Button";
import Input from "../form/Input";
import NoSSR from "./NoSSR";

import styles from "./Store.module.css";

const StoreComponent = ({ files }: { files: any }) => {
	const router = useRouter();

	const [filteredFiles, setFilteredFiles] = useState(files);

	function searchFiles(search: string) {
		setFilteredFiles(
			files.filter((file: doc) => file.title.toLowerCase().includes(search))
		);
	}

	async function create() {
		const res = (await sendFetch(
			`${process.env.NEXT_PUBLIC_API_URL}/store/docs`,
			"POST",
			"",
			{
				file: {
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

		router.push(`/edit/${res.data.file._id}`);
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
						<Button primary={true} onClick={create}>
							<FaPlus />
						</Button>
					</div>
					<div className={styles.containerFiles}>
						<div className={styles.files}>
							{filteredFiles.map((file: doc, i: number) => {
								const words = countWordsInObject(file.body);

								return (
									<div className={styles.file} key={i}>
										<div className={styles.fileInfo}>
											<h3>{file.title}</h3>
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
											<Link href={`/edit/${file._id}`}>
												<button className={styles.button}>
													<FaPenFancy />
												</button>
											</Link>
											<Link href={`/edit/${file._id}?mode=preview`}>
												<button className={styles.button}>
													<FaEye />
												</button>
											</Link>
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
