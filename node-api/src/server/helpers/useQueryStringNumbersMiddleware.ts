import Express, { NextFunction, Request, Response } from 'express';
import Qs from 'qs';
import NumbersPatch from 'qs-numbers';

// patch qs to work with numbers.
NumbersPatch(Qs);

export function useQueryStringNumbersMiddleware(app: Express.Application) {
	const handler = async (req: Request, _res: Response, next: NextFunction) => {
		// convert query to numbers.
		req.query = Qs.parse(Qs.stringify(req.query));

		next();
	};

	app.use(handler);
}
