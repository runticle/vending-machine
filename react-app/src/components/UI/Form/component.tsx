import styled from 'styled-components';

export const Form = ({ children }: { children: React.ReactNode }) => {
	return <FormStyles>{children}</FormStyles>;
};

const FormStyles = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: left;
	width: 100%;
`;
