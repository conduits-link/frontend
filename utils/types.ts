// API

export type apiResponse = {
	response: Response;
	body: null | any; // TODO: change to OR types for every possible response
};

export type apiPrompt = {
	promptName: string;
	messages: [
		{
			role: string;
			content: string;
		}
	];
};

// Files

export type doc = {
	uid: string;
	title: string;
	body: any;
	created: Date;
	modified: Date;
};
