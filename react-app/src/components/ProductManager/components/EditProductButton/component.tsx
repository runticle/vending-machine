import { useCallback, useState } from 'react';
import Modal from '../../../UI/Modal';
import Button from '../../../UI/Button';
import { Heading2 } from '../../../TextComponents/Heading2';
import { useProductContext } from '../../../../context/Product/useProductContext';
import ProductForm from '../ProductForm';
import {
	Product,
	UpdateProductPayload,
} from '../../../../context/Product/types';
import { globalErrorHandler } from '../../../../utils/functions/globalErrorHandler';

export const EditProductButton = ({ product }: { product: Product }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { loading, updateProduct } = useProductContext();

	const handleEditProduct = useCallback(
		async (newProduct: {
			productName: string;
			cost: number;
			amountAvailable: number;
		}) => {
			const payload: Partial<UpdateProductPayload> = {};

			console.log('cost', newProduct.cost);

			if (newProduct.productName !== product.product_name)
				payload.product_name = newProduct.productName;

			if (newProduct.cost !== product.cost)
				payload.cost = newProduct.cost;

			if (newProduct.amountAvailable !== product.amount_available)
				payload.amount_available = newProduct.amountAvailable;

			try {
				await updateProduct({
					...payload,
					id: product.id,
				});

				handleCloseModal();
			} catch (error) {
				globalErrorHandler({
					error,
					title: 'Error updating product',
				});
			}
		},
		[product, updateProduct],
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
				title="Edit"
				onPress={handleOpenModal}
			/>

			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			>
				<Heading2>Edit Product</Heading2>
				<ProductForm
					onSubmit={handleEditProduct}
					existingProduct={product}
					loading={!!loading}
				/>
			</Modal>
		</div>
	);
};
