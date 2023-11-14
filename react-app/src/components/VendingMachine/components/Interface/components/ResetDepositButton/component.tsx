import { useCallback } from 'react';
import Button from '../../../../../UI/Button';
import { globalErrorHandler } from '../../../../../../utils/functions/globalErrorHandler';
import { notifySuccess } from '../../../../../../utils/functions/notifySuccess';
import { useUserContext } from '../../../../../../context/User/useUserContext';
import { useUser } from '../../../../../../utils/hooks/useUser';

export const ResetDepositButton = () => {
	const { resetDeposit } = useUserContext();
	const user = useUser();

	const handleResetDeposit = useCallback(async () => {
		try {
			await resetDeposit();

			notifySuccess({
				message: `Change returned`,
			});
		} catch (error) {
			globalErrorHandler({
				error,
				title: 'Error giving change',
			});
		}
	}, [resetDeposit]);

	return (
		<Button
			disabled={user?.deposit === 0}
			title="Return change"
			onPress={handleResetDeposit}
		/>
	);
};
