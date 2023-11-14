import { BaseText, useStyles } from './styles';
import { TextProps } from './types';

export const Heading1 = ({ children, style }: TextProps) => {
	const styles = useStyles();

	return (
		<BaseText style={{ ...styles.heading1, ...style }}>{children}</BaseText>
	);
};
