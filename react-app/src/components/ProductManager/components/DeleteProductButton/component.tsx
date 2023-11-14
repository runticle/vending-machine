import React, { useCallback } from 'react';
import Button from '../../../UI/Button';
import { useProductContext } from '../../../../context/Product/useProductContext';
import { Product } from '../../../../context/Product/types';
import { globalErrorHandler } from '../../../../utils/functions/globalErrorHandler';
import useShowAlert from '../../../../utils/hooks/useShowAlert';

export const DeleteProductButton = ({ id }: { id: Product['id'] }) => {
	const { deleteProduct, loading } = useProductContext();

	const showAlert = useShowAlert();

	const handleDeleteProduct = useCallback(
		async (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();

			showAlert(
				'Danger!',
				'Are you sure you want to delete this product?',
				[
					{
						title: 'Logout',
						onPress: async () => {
							try {
								await deleteProduct(id);
							} catch (error) {
								globalErrorHandler({
									error,
									title: 'Error deleting product',
								});
							}
						},
						type: 'success',
					},
					{
						title: 'Cancel',
						type: 'cancel',
					},
				],
			);
		},
		[deleteProduct, id, showAlert],
	);

	return (
		<div>
			<Button
				title="Delete"
				onPress={handleDeleteProduct}
				loading={loading}
			/>
		</div>
	);
};
