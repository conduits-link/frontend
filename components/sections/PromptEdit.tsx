"use client";

import { useEffect, useRef, useState } from "react";

import { wrapFetch } from "@/utils/fetch";
import { useFlashMessage } from "@/utils/flash";
import { apiResponse } from "@/utils/types";

import Prompt from "../types/Prompt";

import Input from "../form/Input";
import Button from "../buttons/Button";

import styles from "./PromptEdit.module.css";

const PromptEdit = ({
  prompt,
  isNew,
}: {
  prompt: Prompt;
  isNew?: (prompt: Prompt) => void;
}) => {
  const { showFlashMessage } = useFlashMessage();

  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(isNew ? true : false);

  const [newPromptName, setNewPromptName] = useState(prompt.name);
  const [newPromptPrompt, setNewPromptPrompt] = useState(prompt.prompt);

  async function savePrompt() {
    if (isNew) {
      const { response, body } = (await wrapFetch(
        {
          route: `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/prompts`,
          method: "POST",
          cookie: "",
          data: {
            name: newPromptName,
            prompt: newPromptPrompt,
          },
        },
        showFlashMessage,
      )) as apiResponse;

      if (response.ok) {
        // wait and then refresh the page
        setTimeout(() => {
          window.location.reload();
        }, 100);

        // TODO: implement return uid of the new prompt and remove the wait/reload
        // isNew({ ...newPrompt, uid: body.uid });
        setEditing(false);
      }
    } else {
      const { response } = (await wrapFetch(
        {
          route: `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/prompts/${prompt.uid}`,
          method: "PUT",
          cookie: "",
          data: {
            name: newPromptName,
            prompt: newPromptPrompt,
          },
        },
        showFlashMessage,
      )) as apiResponse;

      if (response.ok) {
        setEditing(false);
      }
    }
  }

  if (!editing) {
    return (
      <div key={prompt.uid} className={styles.containerMain} ref={ref}>
        <div onClick={() => setOpen(!open)} className={styles.buttonToggle}>
          <h2 className={styles.name}>{prompt.name}</h2>
        </div>
        {open && (
          <>
            <p className={styles.prompt}>{prompt.prompt}</p>
            <Button
              onClick={() => setEditing(true)}
              primary={true}
              className={styles.button}
            >
              Edit
            </Button>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div key={prompt.uid} className={styles.containerMain} ref={ref}>
        <h2 className={styles.title}>{isNew ? "New Prompt" : "Edit Prompt"}</h2>
        <div className={styles.input}>
          <Input
            type="text"
            label={"Name"}
            placeholder={"Enter prompt name..."}
            value={prompt.name}
            onChange={(e) => setNewPromptName(e.target.value)}
          />
        </div>
        <div className={styles.input}>
          <Input
            type="textarea"
            label={"Prompt"}
            placeholder={"Enter prompt..."}
            value={prompt.prompt}
            onChange={(e) => setNewPromptPrompt(e.target.value)}
          />
        </div>
        <Button onClick={savePrompt} primary={true} className={styles.button}>
          Save
        </Button>
      </div>
    );
  }
};

export default PromptEdit;
