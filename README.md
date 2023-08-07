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
3. Multimedia
   -  Summarise audio (from links)
   -  Create images/diagrams of content
   -  LaTeX support via KaTeX or MathJax
4. UI
   - Movable, collapsable generated material
   - Code syntax highlighting
  
## Architecture

* Run AI on an [AWS EC2 Inf1](https://aws.amazon.com/ec2/instance-types/inf1/) instance. In particular, inf1.6xlarge, since this is the cheapest option that lets us run the largest LLaMA 2 model, with 48GB GPU memory.
* Prompt formatting on frontend in Next.js.
* Python and Flask on backend, sending prompts to LLaMA model and transmitting output.

## Run

To run the dev site:

```bash
npm install
npm run dev
```
