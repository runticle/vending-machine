import React, { useCallback, useEffect, useState } from 'react';
import Button from '../../../UI/Button';
import { TextInput } from '../../../Inputs/TextInput';
import { Form } from '../../../UI/Form/component';
import { Product } from '../../../../context/Product/types';
import { NumericInput } from '../../../Inputs/NumericInput';
import { CostInput } from '../../../Inputs/CostInput';

export const ProductForm = ({
	existingProduct,
	onSubmit,
	loading,
}: {
	existingProduct?: Product;
	onSubmit: (product: {
		productName: string;
		cost: number;
		amountAvailable: number;
	}) => Promise<void>;
	loading: boolean;
}) => {
	const [productName, setProductName] = useState<Product['product_name']>('');
	const [cost, setCost] = useState('');
	const [amountAvailable, setAmountAvailable] =
		useState<Product['amount_available']>(0);

	useEffect(() => {
		if (existingProduct) {
			setProductName(existingProduct.product_name);
			setCost((existingProduct.cost / 100).toString());
			setAmountAvailable(existingProduct.amount_available);
		}
	}, [existingProduct]);

	const handleSubmit = useCallback(
		async (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();

			await onSubmit({
				productName: productName,
				cost: safeParseCostToPennies(cost),
				amountAvailable: amountAvailable,
			});
		},
		[onSubmit, productName, cost, amountAvailable],
	);

	return (
		<Form>
			<TextInput
				title="Product name"
				placeholder="Enter product name..."
				value={productName}
				onChangeValue={setProductName}
			/>

			<NumericInput
				title="Amount available"
				placeholder="Enter amount available..."
				value={amountAvailable}
				onChangeValue={setAmountAvailable}
			/>

			<CostInput
				title="Cost"
				placeholder="Enter cost..."
				value={cost}
				onChangeValue={setCost}
			/>

			<Button
				title="Submit"
				onPress={handleSubmit}
				loading={loading}
			/>
		</Form>
	);
};

function safeParseCostToPennies(cost: string) {
	const costInPennies = Math.round(parseFloat(cost) * 100);

	if (isNaN(costInPennies)) {
		throw new Error('Invalid cost');
	}

	return costInPennies;
}
