// INPUTS
export type APIPayload = {
	path: string;
	token?: string;
	override_id?: number;
	headers?: Record<string, string>;
};

export type WithQuery = {
	query?: Record<string, JsonDataType>;
};
export type WithBody = {
	data?: Record<string, JsonDataType>;
};

type JsonDataType = string | number | boolean | undefined;

// // OUTPUTS
export type ServerSuccess = {
	success: true;
	data?: JsonDataType;
};
export type ServerError = {
	success: false;
	error: string;
};
export type ServerResponse = ServerSuccess | ServerError;
