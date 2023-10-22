"use client";

import { useState } from "react";
import Link from "next/link";

import {
	FaClipboardList,
	FaEye,
	FaFile,
	FaPenFancy,
	FaPlus,
	FaTrash,
} from "react-icons/fa6";

import styles from "./page.module.css";

export default function Store() {
	const [files, setFiles] = useState([
		{ title: "test document 1", link: "1", type: "doc", words: 10 },
		{ title: "test document 2", link: "2", type: "doc", words: 100 },
		{ title: "test document 3", link: "3", type: "doc", words: 1000 },
	]);
	const [selectedType, setSelectedType] = useState("doc");
	const [filteredFiles, setFilteredFiles] = useState(files);

	const switchSelectedType = (type: string) => {
		setSelectedType(type);
		setFilteredFiles(files.filter((file) => file.type === type));
	};

	function searchFiles(search: string) {
		setFilteredFiles(
			files.filter((file) => file.title.toLowerCase().includes(search))
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.page}>
				<div className={styles.heading}>
					<h1>Files</h1>
					<input
						type="text"
						placeholder="Search"
						className={styles.search}
						onChange={(e) => searchFiles(e.target.value)}
					/>
					<button className={styles.buttonPrimary}>
						<FaPlus />
					</button>
				</div>
				<div className={styles.containerFiles}>
					{/* <div className={styles.containerTypeSelect}>
						<button
							className={
								styles.typeSelect +
								(selectedType === "doc"
									? " " + styles.typeSelectActive
									: "")
							}
							onClick={() => switchSelectedType("doc")}
						>
							<FaFile />
						</button>
						<button
							className={
								styles.typeSelect +
								(selectedType === "notes"
									? " " + styles.typeSelectActive
									: "")
							}
							onClick={() => switchSelectedType("notes")}
						>
							<FaClipboardList />
						</button>
					</div> */}
					<div className={styles.files}>
						{filteredFiles.map((file) => (
							<div className={styles.file}>
								<div className={styles.fileInfo}>
									<h3>{file.title}</h3>
									<p>
										<span className={styles.fileInfoType}>
											{file.type === "doc" && <>Document</>}
										</span>{" "}
										•{" "}
										<span className={styles.fileInfoWords}>
											{file.words} words
										</span>
									</p>
								</div>
								<div className={styles.fileButtons}>
									<Link href={`/edit/${file.link}`}>
										<button className={styles.button}>
											<FaEye />
										</button>
									</Link>
									<Link href={`/edit/${file.link}`}>
										<button className={styles.button}>
											<FaPenFancy />
										</button>
									</Link>
									<Link href={`/edit/${file.link}`}>
										<button className={styles.button}>
											<FaTrash />
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
}
