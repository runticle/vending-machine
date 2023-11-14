import { StatusError } from '../../server/errors/helpers/StatusError';
import { User } from '../../entity/User';
import { RequestWithAuth } from '../../server/types';

const handler = async function (req: RequestWithAuth) {
	const { user_id } = req.auth!;

	const user = await User.findById(user_id);

	if (!user) {
		throw new StatusError('User not found', 404);
	}

	return user;
};

export default handler;
