import styled from 'styled-components';
import Deposit from './components/Desposit';
import Interface from './components/Interface';
import Machine from './components/Machine';

export const VendingMachine: React.FC = () => {
	return (
		<VendingMachineContainerStyles>
			<Machine />
			<InterfaceStyles>
				<Interface />
				<Deposit />
			</InterfaceStyles>
		</VendingMachineContainerStyles>
	);
};

const VendingMachineContainerStyles = styled.div`
	display: flex;
	flex: 1;
	flex-direction: row;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const InterfaceStyles = styled.div`
	display: flex;
	flex-direction: column;

	flex: 1;
`;
