import { RequestWithAuth } from '../../../server/types';
import { calculateChange } from '../../../utilities/calculateChange';

const handler = async function (req: RequestWithAuth) {
	const { user } = req.auth!;

	const change = calculateChange(user.deposit);

	user.deposit = 0;

	await user.save();

	return change;
};

export default handler;
