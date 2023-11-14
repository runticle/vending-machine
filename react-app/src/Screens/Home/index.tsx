import NavBar from '../../components/NavBar';
import ProductManager from '../../components/ProductManager';
import { useUser } from '../../utils/hooks/useUser';
import VendingMachine from '../../components/VendingMachine';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { Heading1 } from '../../components/TextComponents/Heading1';
import { Body2 } from '../../components/TextComponents/Body2';
import useConstantData from '../../utils/hooks/useConstantData';

const WelcomeStyles = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
`;

function Home() {
	const user = useUser();

	useConstantData();

	return (
		<HomeStyles>
			<NavBar />
			{user?.role === 'seller' ? (
				<ProductManager />
			) : user?.role === 'buyer' ? (
				<VendingMachine />
			) : (
				<WelcomeStyles>
					<Heading1>Welcome to Vendr!</Heading1>
					<Body2>Please signup or login to begin.</Body2>
					<Body2>Choose to be either a Seller or a Buyer!</Body2>
				</WelcomeStyles>
			)}
			<ToastContainer />
		</HomeStyles>
	);
}

export default Home;

const HomeStyles = styled.div`
	background-color: var(--primaryColor);
	min-height: 100vh;
`;
