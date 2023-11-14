import { toast } from 'react-toastify';

type SuccessNotifierProps = {
	message?: string;
};

export const notifySuccess = ({ message }: SuccessNotifierProps) => {
	toast.success(`${message || 'Success!'}`, {
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
