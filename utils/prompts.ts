export interface Prompt {
	name: string;
	prompt: string;
}

const prompts: Prompt[] = [
	{
		name: "Rewrite",
		prompt: "",
	},
	{
		name: "Summarise",
		prompt:
			"Please rewrite the following text in the fewest possible sentences, whilst ensuring that no key information is lost. If making it any shorter causes information to be lost, then please do not do anything.",
	},
	{
		name: "Expand",
		prompt: "",
	},
	{
		name: "Create examples",
		prompt: "",
	},
	{
		name: "Create a diagram",
		prompt: "",
	},
];

export default prompts;
