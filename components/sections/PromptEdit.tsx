"use client";

import { useEffect, useRef, useState } from "react";

import { wrapFetch } from "@/utils/fetch";
import { useFlashMessage } from "@/utils/flash";
import { apiResponse } from "@/utils/types";

import Prompt from "../types/Prompt";

import styles from "./PromptEdit.module.css";

const PromptEdit = ({ prompt, isNew }: { prompt: Prompt; isNew?: boolean }) => {
  const { showFlashMessage } = useFlashMessage();

  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(isNew);

  const [newPrompt, setNewPrompt] = useState(prompt);

  async function savePrompt() {
    if (isNew) {
      const { response, body } = (await wrapFetch(
        {
          route: `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/prompts`,
          method: "POST",
          cookie: "",
          data: {
            name: newPrompt.name,
            prompt: newPrompt.prompt,
          },
        },
        showFlashMessage,
      )) as apiResponse;

      if (response.ok) {
        setEditing(false);
      }
    } else {
      const { response } = (await wrapFetch(
        {
          route: `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/prompts/${prompt.uid}`,
          method: "PUT",
          cookie: "",
          data: {
            name: newPrompt.name,
            prompt: newPrompt.prompt,
          },
        },
        showFlashMessage,
      )) as apiResponse;

      if (response.ok) {
        setEditing(false);
      }
    }
  }

  const handleClickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      // delay by a millisecond to allow the button click to register
      // TODO: fix this hack
      setTimeout(() => {
        setOpen(false);
      }, 100);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!editing) {
    return (
      <div key={prompt.uid} className={styles.containerMain} ref={ref}>
        <div onClick={() => setOpen(!open)} className={styles.buttonToggle}>
          <h2 className={styles.buttonToggle}>{prompt.name}</h2>
        </div>
        {open && (
          <>
            <p className={styles.prompt}>{prompt.prompt}</p>
            <button onClick={() => setEditing(true)}>Edit</button>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div key={prompt.uid} className={styles.containerMain} ref={ref}>
        <div className={styles.buttonToggle}>
          <input
            type="text"
            value={prompt.name}
            onChange={(e) => setNewPrompt({ ...prompt, name: e.target.value })}
          />
        </div>
        <textarea
          value={prompt.prompt}
          onChange={(e) => setNewPrompt({ ...prompt, prompt: e.target.value })}
        />
        <button onClick={savePrompt}>Save</button>
      </div>
    );
  }
};

export default PromptEdit;
