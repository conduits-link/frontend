# Noteworthy

Noteworthy is an LLM-based text editor, with an intuitive and powerful graphical user interface. Employ an AI assistant to help you write without typing any prompts!

## Contents

-  [Demo](#demo)
-  [Setup](#setup)
-  [Documentation](#documentation)
-  [(Planned) Features](#planned-features)

_See [noteworthy-backend](https://github.com/jhels/noteworthy-backend) for backend deployment of this technology._

## Demo

### Edit mode

Edit mode allows users to edit the document node and text content.

![Edit mode screenshot](/public/demos/screenshot-mode-edit.png "Edit mode")

### View mode

View mode allows users to view their document without any obstructions or accidental edits.

![View mode screenshot](/public/demos/screenshot-mode-view.png "View mode")

### Prompt menu

There is a prompt menu associated with each node, that allows users to interact with an LLM via preset prompts.

![Prompt menu screenshot](/public/demos/screenshot-prompt-menu.png "Prompt menu")

### Prompt responses

Responses to prompts for are collected underneath the node they were applied to.

![Single prompt response screenshot](/public/demos/screenshot-prompt-response-single.png "Single prompt response")

![Multiple prompt responses screenshot](/public/demos/screenshot-prompt-response-multiple.png "Multiple prompt responses")

## Setup

### Run with built-in API

This is the easiest way to run Noteworthy, as it uses the local API built into the frontend. This means that all files are stored/read from the system of the machine that Noteworthy is running on. However, there is obviously no syncing between different machines or choices of generative AI usage (there is only currently support for OpenAI locally).

1. Add the following environment variables to a `.env.local` file in the root directory of this project:

   | Variable              | Value                                                                                                                 |
   | --------------------- | --------------------------------------------------------------------------------------------------------------------- |
   | `NEXT_PUBLIC_API_URL` | `http://localhost:3000/api`                                                                                           |
   | `STORE_LOCATION`      | The absolute location of the folder you want to read/write files to on your machine (e.g., `/home/<user>/Documents`). |
   | `OPENAI_API_KEY`      | An OpenAI API key.                                                                                                    |

2. Install dependencies:

   ```bash
   npm i
   ```

   -  If you are pulling after recent commits (and dependencies have changed/updated), reinstall dependencies:

      ```bash
      npm ci
      ```

3. Run in _either_:

   -  Development mode (auto-reload without pre-rendering):

      ```bash
      npm run dev
      ```

   -  Production mode (pre-rendering without auto-reload):

      ```bash
      npm run start
      ```

### Run with external API

This is how Noteworthy works in production: a separate backend handles authentication, file storage, and generative AI usage. Any backend can be used, so long as it hosts [these endpoints](/docs/api.md#backend).

1. Add the following environment variables to a `.env.local` file in the root directory of this project:

   | Variable              | Value                                                                                                          |
   | --------------------- | -------------------------------------------------------------------------------------------------------------- |
   | `NEXT_PUBLIC_API_URL` | The root URL of the backend that hosts [these endpoints](/docs/api.md#backend) (e.g.,`http://127.0.0.1:8000`). |

2. Install dependencies:

   ```bash
   npm i
   ```

   -  If you are pulling after recent commits (and dependencies have changed/updated), reinstall dependencies:

      ```bash
      npm ci
      ```

3. Run in _either_:

   -  Development mode (auto-reload without pre-rendering):

      ```bash
      npm run dev
      ```

   -  Production mode (pre-rendering without auto-reload):

      ```bash
      npm run start
      ```

## Documentation

-  [API reference](/docs/api.md)

## (Planned) Features

1. File upload
   -  Copy file content
   -  Summarise file content
   -  Consolidate content from multiple files
   -  Individually extract text, images, LaTex, and code
2. Text highlighting
   -  Re-write (in the style of X)
   -  Summarise
   -  Expand
   -  Create examples
   -  Draw diagram
   -  Generate code
   -  AI-generated custom suggestions, based on context
   -  Translate
   -  Generate todo list (steps required to complete something)
   -  Implement feedback (paste in the written feedback someone has given you)
3. Multimedia
   -  Summarise audio (from links)
   -  Create images/diagrams of content
   -  LaTeX support via KaTeX or MathJax
4. UI
   -  Movable, collapsable generated material
   -  Code syntax highlighting
   -  Search bar
   -  Drag and drop with option buttons to the side of nodes
   -  Add page columns to support different page layouts
   -  `/create` page where template document prompts can be selected, or multiple files uploaded to be summarised/based-from/etc
   -  Side panel for "Research this content"
5. Spell/grammar checker
6. Customisation
   -  Allow people to write their own prompts (in development, just use CSV/JSON)
7. Social media features
   -  Profile pictures, friends, etc.
   -  Sharable, user-created prompt libraries.
