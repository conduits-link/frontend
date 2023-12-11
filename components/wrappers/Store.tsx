"use client";

import { useState } from "react";
import Link from "next/link";

import { FaEye, FaPenFancy, FaPlus } from "react-icons/fa6";

import Button from "@/components/buttons/Button";

import styles from "./Store.module.css";
import Loading from "@/components/wrappers/Loading";
import { file } from "@/utils/interfaces";
import sendFetch from "@/utils/fetch";
import { useRouter } from "next/navigation";
import Input from "../form/Input";

const StoreComponent = ({ files }: { files: any }) => {
	const router = useRouter();

	const [filteredFiles, setFilteredFiles] = useState(files);

	function searchFiles(search: string) {
		setFilteredFiles(
			files.filter((file: file) => file.title.toLowerCase().includes(search))
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
					<Button
						primary={true}
						onClick={create}
					>
						<FaPlus />
					</Button>
				</div>
				<div className={styles.containerFiles}>
					<div className={styles.files}>
						{filteredFiles.map((file: file, i: number) => (
							<div
								className={styles.file}
								key={i}
							>
								<div className={styles.fileInfo}>
									<h3>{file.title}</h3>
									{/* <p>
										<span className={styles.fileInfoType}>
											{file.type === "doc" && <>Document</>}
										</span>
										<span className={styles.fileInfoWords}>
											{file.words} words
										</span>
									</p> */}
								</div>
								<div className={styles.fileButtons}>
									<Link href={`/edit/${file.link}`}>
										<button className={styles.button}>
											<FaPenFancy />
										</button>
									</Link>
									<Link href={`/edit/${file.link}?mode=preview`}>
										<button className={styles.button}>
											<FaEye />
										</button>
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StoreComponent;
