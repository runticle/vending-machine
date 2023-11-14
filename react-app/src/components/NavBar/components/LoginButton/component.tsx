import React, { useCallback, useState } from 'react';
import Modal from '../../../UI/Modal';
import Button from '../../../UI/Button';
import { useAuthContext } from '../../../../context/Auth/useAuthContext';
import { TextInput } from '../../../Inputs/TextInput';
import { Form } from '../../../UI/Form/component';
import { Heading2 } from '../../../TextComponents/Heading2';
import { globalErrorHandler } from '../../../../utils/functions/globalErrorHandler';

export const LoginButton: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const { loading, login } = useAuthContext();

	const handleLogin = useCallback(
		async (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();

			try {
				await login({
					username: username.trim(),
					password,
				});

				handleCloseModal();
			} catch (error) {
				globalErrorHandler({
					error,
					title: 'Error logging in',
				});
			}
		},
		[login, username, password],
	);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setUsername('');
		setPassword('');

		setIsModalOpen(false);
	};

	return (
		<div>
			<Button
				title="Login"
				onPress={handleOpenModal}
			/>

			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			>
				<Form>
					<Heading2>Login</Heading2>

					<TextInput
						placeholder="Enter username..."
						value={username}
						onChangeValue={setUsername}
					/>

					<TextInput
						placeholder="Enter password..."
						value={password}
						type="password"
						onChangeValue={setPassword}
					/>

					<Button
						title="Login"
						loading={loading}
						onPress={handleLogin}
					/>
				</Form>
			</Modal>
		</div>
	);
};
