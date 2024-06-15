import { useEffect, useState } from "react";

import { Prompt, prompts } from "@/utils/prompts";

import { wrapFetch } from "@/utils/fetch";
import { apiPrompt, apiResponse } from "@/utils/types";
import { useFlashMessage } from "@/utils/flash";

import PromptButton from "../buttons/PromptButton";

import styles from "./PromptMenu.module.css";

const PromptMenu = ({
	className,
	handleRequest,
	handleResponse,
}: {
	className?: string;
	handleRequest: () => string;
	handleResponse: (res: apiPrompt) => void;
}) => {
    const { showFlashMessage } = useFlashMessage();

   const [customPrompts, setCustomPrompts] = useState<Prompt[]>([]);
  
   async function getPrompts() {
      const { response, body } = (await wrapFetch(
        {
          route: `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/prompts`,
          method: "GET",
          cookie: "",
        },
        showFlashMessage,
      )) as apiResponse;

      if (response.ok) {
         setCustomPrompts(body);
      }
   }

   useEffect(() => {
      getPrompts();
   }, []);


	return (
		<div className={className + " " + styles.container}>
         {prompts &&
            prompts.map((prompt, index) => {
               return (
                  <PromptButton
                     promptName={prompt.name}
                     prompt={prompt.prompt}
                     handleRequest={handleRequest}
                     handleResponse={handleResponse}
                     key={index}
                  >
                     {prompt.name}
                  </PromptButton>
               );
            })}
			{customPrompts &&
				customPrompts.map((prompt, index) => {
					return (
						<PromptButton
							promptName={prompt.name}
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
