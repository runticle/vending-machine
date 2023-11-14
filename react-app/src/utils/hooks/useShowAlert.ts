import { useCallback } from 'react';

type AlertButtonType = 'success' | 'cancel';

type AlertButton = {
	title: string;
	onPress?: () => void;
	type?: AlertButtonType;
};

type ShowAlertFunction = (
	title: string,
	message: string,
	buttons?: AlertButton[],
) => void;

// todo create some context and an alert modal and use that instead
const useShowAlert = (): ShowAlertFunction => {
	const showAlert: ShowAlertFunction = useCallback(
		(title, message, buttons) => {
			const alertMessage = `${title}\n\n${message}`;

			if (buttons && buttons.length > 0) {
				const confirmationMessage = alertMessage;

				if (window.confirm(confirmationMessage)) {
					const selectedButton = buttons.find(
						button => button.type === 'success',
					);
					if (selectedButton && selectedButton.onPress) {
						selectedButton.onPress();
					}
				} else {
					const cancelButton = buttons.find(
						button => button.type === 'cancel',
					);
					if (cancelButton && cancelButton.onPress) {
						cancelButton.onPress();
					}
				}
			} else {
				window.alert(alertMessage);
			}
		},
		[],
	);

	return showAlert;
};

export default useShowAlert;
