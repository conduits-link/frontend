# Noteworthy

Noteworthy is an LLM-based text editor, with an intuitive and powerful graphical user interface. Employ an AI assistant to help you write without typing any prompts!

Demo screenshots and video coming soon.

* See [noteworthy-frontend](https://github.com/jhels/noteworthy-frontend/) and [noteworthy-backend](https://github.com/jhels/noteworthy-backend) for a deployment of this technology.

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

## Incoming Features

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
   -  Apply data (implement content based on data/information you have been given)
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
5. Spell/grammar checker
6. Customisation
   -  Allow people to write their own prompts (in development, just use CSV/JSON)
7. Social media features
   -  Profile pictures, friends, etc.
   -  Sharable, user-created prompt libraries.
