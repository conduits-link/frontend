"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { FaEye, FaPenFancy, FaPlus } from "react-icons/fa6";

import { getStoreLocation } from "@/utils/storage";

import Button from "@/components/buttons/Button";

import styles from "./page.module.css";
import Loading from "@/components/wrappers/Loading";
import { file } from "@/utils/interfaces";

export default function Store() {
	const [selectedType, setSelectedType] = useState("doc");
	const switchSelectedType = (type: string) => {
		setSelectedType(type);
		setFilteredFiles(files.filter((file) => file.type === type));
	};

	const [isLoading, setLoading] = useState(true);
	const [files, setFiles] = useState<file[]>([
		{
			title: "",
			body: [],
			modified: new Date(),
			link: "",
			type: "",
		},
	]);
	const [filteredFiles, setFilteredFiles] = useState(files);

	function searchFiles(search: string) {
		setFilteredFiles(
			files.filter((file) => file.title.toLowerCase().includes(search))
		);
	}

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

	return (
		<div className={styles.container}>
			<div className={styles.page}>
				<div className={styles.heading}>
					<h1>Files</h1>
					{isLoading ? (
						<></>
					) : (
						<input
							type="text"
							placeholder="Search"
							className={styles.search}
							onChange={(e) => searchFiles(e.target.value)}
						/>
					)}
					<Button primary={true}>
						<FaPlus />
					</Button>
				</div>
				{isLoading ? (
					<div className={styles.containerLoading}>
						<Loading>Loading files...</Loading>
					</div>
				) : (
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
							{filteredFiles.map((file, i: number) => (
								<div
									className={styles.file}
									key={i}
								>
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
				)}
			</div>
		</div>
	);
}
