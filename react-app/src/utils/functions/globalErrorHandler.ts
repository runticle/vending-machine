import { toast } from 'react-toastify';

type ErrorHandlerProps = {
	error: unknown;
	title?: string;
};

export const globalErrorHandler = ({ error, title }: ErrorHandlerProps) => {
	let message: string = '';

	if (error instanceof Error) {
		message = error.message;
	}

	toast.error(`${title || 'Sorry!'}: ${message}`, {
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
	});
};
