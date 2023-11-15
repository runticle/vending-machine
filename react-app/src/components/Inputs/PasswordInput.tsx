import { useCallback, useState } from 'react';
import Link from '../UI/Link';
import { TextInput } from './TextInput';

export const PasswordInput = ({
	placeholder,
	value,
	onChangeValue,
}: {
	placeholder?: string;
	value: string;
	onChangeValue: (value: string) => void;
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = useCallback(() => {
		setShowPassword(!showPassword);
	}, [showPassword]);

	return (
		<>
			<TextInput
				placeholder={placeholder || 'Enter password...'}
				value={value}
				type={showPassword ? 'text' : 'password'}
				onChangeValue={onChangeValue}
			/>
			<Link
				onPress={toggleShowPassword}
				title={showPassword ? 'Hide Password' : 'Show Password'}
			/>
		</>
	);
};
