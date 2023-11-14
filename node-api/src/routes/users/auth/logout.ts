import { StatusError } from '../../../server/errors/helpers/StatusError';
import { RequestWithAuth } from '../../../server/types';
import { AccessToken } from '../../../entity/AccessToken';

const handler = async function (req: RequestWithAuth) {
	const { user } = req.auth!;

	if (!user) {
		throw new StatusError("Couldn't find user. Developer Error", 500);
	}

	// delete all access tokens for this user
	await AccessToken.createQueryBuilder().delete().from(AccessToken).where('user_id = :userId', { userId: user.id }).execute();

	return;
};

export default handler;
