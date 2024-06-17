import React, { useEffect } from "react";

import { apiPrompt } from "@/utils/types";

import { Editor, Node } from "slate";
import { ReactEditor } from "slate-react";

import { LuAtom } from "react-icons/lu";

import styles from "./Root.module.css";
import PromptMenu from "../menus/PromptMenu";
import {
	EditorInterface,
	ElementType,
	IdeaElement,
   CustomElement,
} from "@/utils/editor/slate";
import IdeaContainer from "./IdeaContainer";

const RootNode = ({
	children,
	ideas,
	editor,
	node,
	mode,
}: {
	children: React.ReactNode;
	ideas?: React.ReactNode;
	editor: Editor;
	node: CustomElement;
	mode: string;
}) => {
	const ideasExist = React.Children.count(ideas) > 0;

	const [showLeftToolbar, setShowLeftToolbar] = React.useState<boolean>(false);
	const [showPromptMenu, setShowPromptMenu] = React.useState<boolean>(false);

	const mouseEnter = () => {
		if (mode == "edit" &&
         EditorInterface.getNodeType(node) !== ElementType.ListUnordered &&
         EditorInterface.getNodeType(node) !== ElementType.ListOrdered)
      setShowLeftToolbar(true);
	};

	const mouseLeave = () => {
		if (mode == "edit" && !showPromptMenu) setShowLeftToolbar(false);
	};

	const getPath = () => ReactEditor.findPath(editor, node)[0];

	const addIdea = (res: apiPrompt) => {
		const idea: IdeaElement = {
			type: ElementType.Idea,
			promptName: res.promptName,
			children: [{ text: res.messages[0].content }],
		};

		EditorInterface.addIdeasToNode(editor, [getPath()], [idea]);
	};

	const handleRequest = () => {
		setShowPromptMenu(false);
		return Node.string(Editor.node(editor, [getPath(), 0])[0]);
	};

	const handleResponse = (res: apiPrompt): void => {
		addIdea(res);
	};

	const getContainerStyles = () => {
		if (mode == "edit" && ideasExist)
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
				{mode == "edit" && ideasExist && (
					<IdeaContainer>{ideas}</IdeaContainer>
				)}
			</div>
		</div>
	);
};

export default RootNode;
