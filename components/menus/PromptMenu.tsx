import prompts from "@/utils/prompts";

import PromptButton from "../buttons/PromptButton";

import styles from "./PromptMenu.module.css";

const PromptMenu = ({
	className,
	handleRequest,
	handleResponse,
}: {
	className?: string;
	handleRequest: () => string;
	handleResponse: (response: string) => void;
}) => {
	return (
		<div className={className + " " + styles.container}>
			{prompts &&
				prompts.map((prompt, index) => {
					return (
						<PromptButton
							prompt={prompt.prompt}
							handleRequest={handleRequest}
							handleResponse={handleResponse}
							key={index}
						>
							{prompt.name}
						</PromptButton>
					);
				})}
		</div>
	);
};

export default PromptMenu;
