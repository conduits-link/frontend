// API

type apiResponse = {
	response: Response;
	body: any; // TODO: change to OR types for every possible response
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

// Files

type doc = {
	_id: string;
	title: string;
	body: any;
	created: Date;
	modified: Date;
};
