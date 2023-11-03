"use client";

import { useEffect, useState } from "react";
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
import { get } from "http";
import { getStoreLocation } from "@/utils/storage";

export default function Store() {
	const [files, setFiles] = useState([]);
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

	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/store/docs", {
			method: "POST",
			body: JSON.stringify({ storeLocation: getStoreLocation() }),
		})
			.then((res) => res.json())
			.then((data) => {
				setFiles(data.docs);
				setFilteredFiles(data.docs);
				setLoading(false);
			});
	}, []);

	if (isLoading) return <p>Loading...</p>;

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
									{/* <p>
										<span className={styles.fileInfoType}>
											{file.type === "doc" && <>Document</>}
										</span>{" "}
										•{" "}
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
									{/* <Link href={`/edit/${file.link}`}>
										<button className={styles.button}>
											<FaTrash />
										</button>
									</Link> */}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
