// API

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

// Files

type doc = {
	_id: string;
	title: string;
	body: any;
	created: Date;
	modified: Date;
};