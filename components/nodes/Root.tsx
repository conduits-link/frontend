import React, { useEffect } from "react";

import { Editor, Node } from "slate";
import { ReactEditor } from "slate-react";

import { LuAtom } from "react-icons/lu";

import styles from "./Root.module.css";
import PromptMenu from "../menus/PromptMenu";
import { EditorInterface, IdeaElement } from "@/utils/editor/slate";
import IdeaContainer from "./IdeaContainer";
import Idea from "./Idea";

const RootNode = ({
	children,
	ideas,
	editor,
	node,
	mode,
}: {
	children: React.ReactNode;
	ideas?: any;
	editor: Editor;
	node: Node;
	mode: string;
}) => {
	const [showLeftToolbar, setShowLeftToolbar] = React.useState<boolean>(false);
	const [showPromptMenu, setShowPromptMenu] = React.useState<boolean>(false);

	const mouseEnter = () => {
		if (mode == "edit") setShowLeftToolbar(true);
	};

	const mouseLeave = () => {
		if (mode == "edit" && !showPromptMenu) setShowLeftToolbar(false);
	};

	const getPath = () => ReactEditor.findPath(editor, node)[0];

	const addIdea = (res: apiPrompt) => {
		const idea: IdeaElement = {
			promptName: res.promptName,
			content: res.messages[0].content,
		};

		EditorInterface.addIdeaToNode(editor, [getPath()], idea);
	};

	const handleRequest = () => {
		setShowPromptMenu(false);
		return Node.string(Editor.node(editor, [getPath(), 0])[0]);
	};

	const handleResponse = (res: apiPrompt): void => {
		addIdea(res);
	};

	const getContainerStyles = () => {
		if (mode == "edit" && ideas && ideas.length > 0)
			return styles.container + " " + styles.containerIdeas;
		return styles.container;
	};

	useEffect(() => {
		setShowLeftToolbar(false);
		setShowPromptMenu(false);
	}, [mode]);

	return (
		<div
			className={getContainerStyles()}
			onMouseEnter={mouseEnter}
			onMouseLeave={mouseLeave}
		>
			<div className={styles.element}>
				<div className={styles.content}>
					{showLeftToolbar && (
						<div
							className={styles.contentToolbarLeft}
							contentEditable={false}
						>
							<button
								className={styles.button}
								onClick={() => setShowPromptMenu(!showPromptMenu)}
							>
								<LuAtom />
							</button>
							{showPromptMenu && (
								<PromptMenu
									className={styles.menuPrompt}
									handleRequest={handleRequest}
									handleResponse={handleResponse}
								/>
							)}
						</div>
					)}
					{children}
				</div>
				{mode == "edit" && ideas && ideas.length > 0 && (
					<IdeaContainer>
						{ideas.map((idea: IdeaElement) => (
							<Idea
								key={idea.promptName}
								editor={editor}
								// node={idea}
								// mode={mode}
							>
								{idea.content}
							</Idea>
						))}
					</IdeaContainer>
				)}
			</div>
		</div>
	);
};

export default RootNode;
