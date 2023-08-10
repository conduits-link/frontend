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
3. Multimedia
   -  Summarise audio (from links)
   -  Create images/diagrams of content
   -  LaTeX support via KaTeX or MathJax
4. UI
   -  Movable, collapsable generated material
   -  Code syntax highlighting
   -  Search bar
5. Customisation
   - Allow people to write their own prompts (in development, just use CSV/JSON)

## Architecture

-  Host LLaMA2 on an [AWS EC2 C5](https://aws.amazon.com/ec2/instance-types/c5/) instance.
   -  Use c5n.4xlarge, the cheapest option that can run LLaMA2 70B (42GB GPU memory). $1.024 per hour.
-  Storage on AWS S3.
-  Host everything else on Vercel.
-  Prompt formatting on frontend in Next.js.
-  Python and Flask on backend, sending prompts to LLaMA model and transmitting output.

## Run

To run the dev site:

```bash
npm install
npm run dev
```
