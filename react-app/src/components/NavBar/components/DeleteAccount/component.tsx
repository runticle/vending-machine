import React, { useCallback } from 'react';
import Button from '../../../UI/Button';
import { useAuthContext } from '../../../../context/Auth/useAuthContext';
import { globalErrorHandler } from '../../../../utils/functions/globalErrorHandler';
import { notifySuccess } from '../../../../utils/functions/notifySuccess';
import useShowAlert from '../../../../utils/hooks/useShowAlert';

export const DeleteAccount: React.FC = () => {
	const { deleteAccount } = useAuthContext();

	const showAlert = useShowAlert();

	const handleDeleteAccount = useCallback(
		async (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();

			showAlert(
				'Danger!',
				'Are you sure you want to delete your account?',
				[
					{
						title: 'Logout',
						onPress: async () => {
							try {
								await deleteAccount();

								notifySuccess({
									message: 'Account deleted successfully',
								});
							} catch (error) {
								globalErrorHandler({
									error,
									title: 'Error deleting account',
								});
							}
						},
						type: 'success',
					},
					{
						title: 'Cancel',
						type: 'cancel',
					},
				],
			);
		},
		[deleteAccount, showAlert],
	);

	return (
		<div>
			<Button
				title="Delete account"
				onPress={handleDeleteAccount}
			/>
		</div>
	);
};
