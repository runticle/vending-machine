export class StatusError extends Error {
	public status: number;

	constructor(message: string, status: number = 500) {
		super(message);

		this.status = status;

		// ensure the correct prototype chain
		// ensures typesafety & instanceof works
		Object.setPrototypeOf(this, StatusError.prototype);
	}
}
