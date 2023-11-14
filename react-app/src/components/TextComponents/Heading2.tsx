import { BaseText, useStyles } from './styles';
import { TextProps } from './types';

export const Heading2 = ({ children, style }: TextProps) => {
	const styles = useStyles();

	return (
		<BaseText style={{ ...styles.heading2, ...style }}>{children}</BaseText>
	);
};
