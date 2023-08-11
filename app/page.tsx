"use client";

import { useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Landing() {
	const [value, setValue] = useState("Hello world.");

	return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}
