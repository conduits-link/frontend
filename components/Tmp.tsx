import React, { useState } from "react";

const CodeBlock = () => {
	const [contentList, setContentList] = useState(["String 1", "String 2"]);
	const [editorContent, setEditorContent] = useState("Initial text");

	const updateContent = (index: number, newContent: any) => {
		const updatedList = [...contentList];
		updatedList[index] = newContent;
		setContentList(updatedList);
	};

	return (
		<div>
			<div
				contentEditable
				onBlur={(e) => setEditorContent(e.target.innerText)}
			>
				{editorContent}
			</div>
			{contentList.map((content, index) => (
				<div
					key={index}
					contentEditable
					onBlur={(e) => updateContent(index, e.target.innerText)}
				>
					{content}
				</div>
			))}
		</div>
	);
};

export default CodeBlock;
