# Noteworthy

The power of LLMs brought to an interface.

## Features

1. File upload
   -  Copy file content
   -  Summarise file content
   -  Consolidate content from multiple files
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

## Documentation

-  [API reference](/docs/api.md)

## Run

After pulling from this repo, install all dependencies.

```bash
npm ci
```

Run in developer mode (no pre-rendering)...

```bash
npm run dev
```

... or build and run in production mode.

```bash
npm run build
npm run start
```
