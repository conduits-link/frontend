export interface Prompt {
	name: string;
	prompt: string;
}

function constructPrompt(input: string, prompt: string): string {
	return prompt + "\n'" + input + "'";
}

const prompts: Prompt[] = [
	{
		name: "Summarise",
		prompt:
			"Please rewrite the following text input in the fewest possible sentences, whilst ensuring that no key information is lost. If making it any shorter causes information to be lost, then please do not do anything. The text input is the following...",
	},
	{
		name: "Expand",
		prompt:
			"Please add more detail to the following text. Do not add information for the sake of it, simply add more relevant information that will enhance the value of the information. The text input is the following...",
	},
	{
		name: "Generate examples",
		prompt:
			"Please provide as many examples as you think are relevant to help demonstrate the following information. The information is the following...",
	},
];

export { constructPrompt, prompts };
