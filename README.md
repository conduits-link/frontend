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
   -  Drag and drop with option buttons to the side of nodes
5. Customisation
   - Allow people to write their own prompts (in development, just use CSV/JSON)

## Architecture

Model Hosting - Development:

- Dan's local LLaMA model.
- AWS Sagemaker serverless inference with Free Tier. Max memory 6GB, which can run the LLaMA 7B model, and hopefully the 13B. Sagemaker offers many different models.
   - 150,000 seconds per month for the first 2 months.

Model Hosting - Production:

-  Host LLaMA2 on an [AWS EC2 C5](https://aws.amazon.com/ec2/instance-types/c5/) instance.
   -  Can use c5n.4xlarge, the cheapest option that can run LLaMA2 70B (42GB GPU memory). $1.024 per hour.
   -  Can use serverless inference, real-time inference, or asynchronous inference depending on budget etc.
- Give users option to choose their preferred LLM.
-  Storage on AWS S3.

General:

-  Host everything else on Vercel.
-  Prompt formatting on frontend in Next.js.
-  Python and Flask on backend, sending prompts to LLaMA model and transmitting output.

## Run

To run the dev site:

```bash
npm install
npm run dev
```
