import React, { useCallback, useState } from 'react';
import Modal from '../../../UI/Modal';
import Button from '../../../UI/Button';
import { Heading2 } from '../../../TextComponents/Heading2';
import { useProductContext } from '../../../../context/Product/useProductContext';
import ProductForm from '../ProductForm';
import { useStyles } from './styles';
import { globalErrorHandler } from '../../../../utils/functions/globalErrorHandler';
import { notifySuccess } from '../../../../utils/functions/notifySuccess';

export const CreateProductButton: React.FC = () => {
	const styles = useStyles();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const { createProduct } = useProductContext();

	const handleCreateProduct = useCallback(
		async (product: {
			productName: string;
			cost: number;
			amountAvailable: number;
		}) => {
			const { productName, cost, amountAvailable } = product;

			try {
				await createProduct({
					product_name: productName,
					cost,
					amount_available: amountAvailable,
				});

				notifySuccess({
					message: 'Product created successfully',
				});

				handleCloseModal();
			} catch (error) {
				globalErrorHandler({
					error,
					title: 'Error creating product',
				});
			}
		},
		[createProduct],
	);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<Button
				title="Create new product"
				onPress={handleOpenModal}
				style={styles.button}
			/>

			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			>
				<Heading2>Create Product</Heading2>
				<ProductForm onSubmit={handleCreateProduct} />
			</Modal>
		</div>
	);
};
