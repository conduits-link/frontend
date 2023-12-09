type apiResponse = {
	status: number;
	message: string;
	data: any;
};

type apiPrompt = {
	promptName: string;
	messages: [
		{
			role: string;
			content: string;
		}
	];
};
