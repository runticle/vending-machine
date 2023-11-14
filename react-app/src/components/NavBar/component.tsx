import React from 'react';
import SignupButton from './components/SignupButton';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import { useLoggedIn } from '../../utils/hooks/useLoggedIn';
import { Heading1 } from '../TextComponents/Heading1';
import { useUser } from '../../utils/hooks/useUser';
import EditPassword from './components/EditPassword';
import DeleteAccount from './components/DeleteAccount';
import styled from 'styled-components';

export const NavbarStyles = styled.div`
	left: 0;
	padding-left: 1rem;
	padding-right: 1rem;
	right: 0;
	height: 100px;
	background-color: var(--secondaryColor);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	box-shadow: var(--boxShadow);
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;

	// TODO build mobile menu
	@media (max-width: 768px) {
		display: none;
	}
`;

export const NavBar: React.FC = () => {
	const user = useUser();

	const isLoggedIn = useLoggedIn();

	return (
		<NavbarStyles>
			<Heading1>{user?.username ?? 'VendR'}</Heading1>
			<ButtonContainer>
				{isLoggedIn ? (
					<>
						<DeleteAccount />
						<EditPassword />
						<LogoutButton />
					</>
				) : (
					<>
						<SignupButton />
						<LoginButton />
					</>
				)}
			</ButtonContainer>
		</NavbarStyles>
	);
};
