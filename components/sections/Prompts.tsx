"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FaPlus } from "react-icons/fa6";

import { useFlashMessage } from "@/utils/flash";
import { wrapFetch } from "@/utils/fetch";
import { Prompt } from "@/utils/prompts";

import Button from "@/components/buttons/Button";
import PromptEdit from "@/components/sections/PromptEdit";
import Input from "../form/Input";

import styles from "./Prompts.module.css";

const Prompts = ({ prompts }: { prompts: Prompt[] }) => {
	const { showFlashMessage } = useFlashMessage();
	const router = useRouter();

   const [currentPrompts, setCurrentPrompts] = useState(prompts);
   const [creatingNewPrompt, setCreatingNewPrompt] = useState(false);

	return (
		<div className={styles.containerMain}>
	      <div className={styles.heading}>
					<h1>Prompts</h1>
					<Button primary={true} onClick={() => setCreatingNewPrompt(true)}>
						<FaPlus />
					</Button>
			</div>
			<div className={styles.containerPrompts}>
            {creatingNewPrompt && (
               <PromptEdit
                  prompt={{ uid: "", name: "", prompt: "" }}
                  isNew={(prompt) => {
                     setCurrentPrompts([...currentPrompts, prompt]);
                     setCreatingNewPrompt(false);
                  }}
               />
            )}
            {prompts.map((prompt) => (
               <PromptEdit key={prompt.uid} prompt={prompt} />
            ))}
         </div>
		</div>
	);
};

export default Prompts;
