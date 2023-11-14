import React from 'react';
import { Button } from './component';

export default Button;

export type ButtonProps = {
	style?: object;
	title: string;
	onPress: (event: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	loading?: boolean;
};
