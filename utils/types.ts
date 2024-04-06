// API

type apiResponse = {
	response: Response;
	body: null | any; // TODO: change to OR types for every possible response
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
	uid: string;
	title: string;
	body: any;
	created: Date;
	modified: Date;
};
