import React, { useCallback } from 'react';
import Button from '../../../UI/Button';
import { useAuthContext } from '../../../../context/Auth/useAuthContext';
import { globalErrorHandler } from '../../../../utils/functions/globalErrorHandler';
import useShowAlert from '../../../../utils/hooks/useShowAlert';

export const LogoutButton: React.FC = () => {
	const { logout, loading } = useAuthContext();

	const showAlert = useShowAlert();

	const handleLogout = useCallback(async () => {
		showAlert('Logout Confirmation', 'Are you sure you want to logout?', [
			{
				title: 'Logout',
				onPress: async () => {
					try {
						await logout();
					} catch (error) {
						globalErrorHandler({
							error,
							title: 'Error logging out',
						});
					}
				},
				type: 'success',
			},
			{
				title: 'Cancel',
				type: 'cancel',
			},
		]);
	}, [logout, showAlert]);

	return (
		<div>
			<Button
				title="Logout"
				onPress={handleLogout}
				loading={loading}
			/>
		</div>
	);
};
