export interface Prompt {
	name: string;
	prompt: string;
}

const prompts: Prompt[] = [
	{
		name: "Summarise",
		prompt:
			"Please rewrite the following text input in the fewest possible sentences, whilst ensuring that no key information is lost. If making it any shorter causes information to be lost, then please do not do anything. The text input is the following...",
	},
	{
		name: "Rewrite",
		prompt:
			"Please rewrite the following text input in the fewest possible sentences, whilst ensuring that no key information is lost. If making it any shorter causes information to be lost, then please do not do anything. The text input is the following...",
	},
	{
		name: "Generate examples",
		prompt:
			"Please rewrite the following text input in the fewest possible sentences, whilst ensuring that no key information is lost. If making it any shorter causes information to be lost, then please do not do anything. The text input is the following...",
	},
];

export default prompts;
