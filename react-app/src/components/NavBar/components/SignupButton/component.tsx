import React, { useCallback, useState } from 'react';
import Modal from '../../../UI/Modal';
import Button from '../../../UI/Button';
import { useAuthContext } from '../../../../context/Auth/useAuthContext';
import { UserRole } from '../../../../context/User/types';
import { TextInput } from '../../../Inputs/TextInput';
import { ChooseRole } from '../../../Inputs/ChooseRole';
import { Form } from '../../../UI/Form/component';
import { Heading2 } from '../../../TextComponents/Heading2';
import { globalErrorHandler } from '../../../../utils/functions/globalErrorHandler';
import { PasswordInput } from '../../../Inputs/PasswordInput';

export const SignupButton: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState<UserRole>('buyer');

	const { loading, signup } = useAuthContext();

	const handleSignup = useCallback(
		async (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();

			try {
				await signup({
					username: username.trim(),
					password,
					role,
				});

				handleCloseModal();
			} catch (error) {
				globalErrorHandler({
					error,
					title: 'Error signing up',
				});
			}
		},
		[signup, username, password, role],
	);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setUsername('');
		setPassword('');
		setRole('buyer');

		setIsModalOpen(false);
	};

	return (
		<div>
			<Button
				title="Signup"
				onPress={handleOpenModal}
			/>

			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			>
				<Form>
					<Heading2>Signup</Heading2>

					<TextInput
						placeholder="Enter username..."
						value={username}
						onChangeValue={setUsername}
					/>

					<PasswordInput
						placeholder="Enter password..."
						value={password}
						onChangeValue={setPassword}
					/>

					<ChooseRole
						value={role}
						onChangeValue={setRole}
					/>

					<Button
						title="Submit"
						onPress={handleSignup}
						loading={loading}
						disabled={!username || !password}
					/>
				</Form>
			</Modal>
		</div>
	);
};
