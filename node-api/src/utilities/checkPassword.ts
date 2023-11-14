import bcrypt from 'bcryptjs';

export const checkPassword = async (password: string, hashedPassword: string) => {
	try {
		const isMatch = await bcrypt.compare(password, hashedPassword);
		return isMatch;
	} catch (error) {
		throw error;
	}
};
