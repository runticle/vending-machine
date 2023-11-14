import { useCallback } from 'react';
import { useProductContext } from '../../../../../../context/Product/useProductContext';
import { Product } from '../../../../../../context/Product/types';
import Button from '../../../../../UI/Button';
import { globalErrorHandler } from '../../../../../../utils/functions/globalErrorHandler';
import { notifySuccess } from '../../../../../../utils/functions/notifySuccess';
import { useProductName } from '../../../../../../utils/hooks/useProductName';

export const BuyProductButton = ({
	productId,
	amount,
	callback,
}: {
	productId?: Product['id'];
	amount: number;
	callback: () => void;
}) => {
	const { buyProduct, loading } = useProductContext();

	const productName = useProductName(productId);

	const handleBuyProduct = useCallback(async () => {
		if (!productId) return;

		try {
			await buyProduct(productId, amount);

			notifySuccess({
				message: `Enjoy your ${productName}!`,
			});

			callback();
		} catch (error) {
			globalErrorHandler({
				error,
				title: 'Error buying product',
			});
		}
	}, [productId, buyProduct, amount, productName, callback]);

	return (
		<Button
			disabled={!productId}
			title="Buy"
			onPress={handleBuyProduct}
			loading={loading}
		/>
	);
};
