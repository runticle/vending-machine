import { BaseText } from './styles';
import { TextProps } from './types';

export const Body2 = ({ children, style }: TextProps) => {
	return <BaseText style={style}>{children}</BaseText>;
};
