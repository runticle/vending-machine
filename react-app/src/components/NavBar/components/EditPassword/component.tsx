import React, { useCallback, useState } from 'react';
import Modal from '../../../UI/Modal';
import Button from '../../../UI/Button';
import { useAuthContext } from '../../../../context/Auth/useAuthContext';
import { Form } from '../../../UI/Form/component';
import { Heading2 } from '../../../TextComponents/Heading2';
import { globalErrorHandler } from '../../../../utils/functions/globalErrorHandler';
import { notifySuccess } from '../../../../utils/functions/notifySuccess';
import { PasswordInput } from '../../../Inputs/PasswordInput';

export const EditPassword: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [password, setPassword] = useState('');

	const { loading, editPassword } = useAuthContext();

	const handleEditPassword = useCallback(
		async (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();

			try {
				await editPassword({
					password,
				});

				notifySuccess({
					message: 'Password updated successfully',
				});

				handleCloseModal();
			} catch (error) {
				globalErrorHandler({
					error,
					title: 'Error updating password',
				});
			}
		},
		[password, editPassword],
	);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setPassword('');

		setIsModalOpen(false);
	};

	return (
		<div>
			<Button
				title="Edit password"
				onPress={handleOpenModal}
			/>

			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			>
				<Form>
					<Heading2>Edit password</Heading2>

					<PasswordInput
						placeholder="Enter new password..."
						value={password}
						onChangeValue={setPassword}
					/>

					<Button
						title="Submit"
						onPress={handleEditPassword}
						loading={loading}
						disabled={!password}
					/>
				</Form>
			</Modal>
		</div>
	);
};
