import React from 'react';

import Button from '../Button';
import { useStyles } from './styles';
import styled from 'styled-components';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	const styles = useStyles();
	if (!isOpen) {
		return null;
	}

	return (
		<ModalOverlay onClick={onClose}>
			<ModalContent onClick={e => e.stopPropagation()}>
				<Button
					title="X"
					onPress={onClose}
					style={styles.closeButton}
				/>
				{children}
			</ModalContent>
		</ModalOverlay>
	);
};

export default Modal;

export const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	justify-content: center;
	align-items: center;
	display: flex;

	z-index: 999;
`;

export const ModalContent = styled.div`
	background: var(--primaryColor);
	padding: 3rem;
	border-radius: 0.5rem;
	box-shadow: var(--boxShadow);
	background-color: var(--secondaryColor);
	max-width: 400px;
	text-align: center;
	position: relative;
`;
