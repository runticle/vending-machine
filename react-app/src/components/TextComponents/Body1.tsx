import { BaseText, useStyles } from './styles';
import { TextProps } from './types';

export const Body1 = ({ children, style }: TextProps) => {
	const styles = useStyles();

	return (
		<BaseText style={{ ...styles.body1, ...style }}>{children}</BaseText>
	);
};
