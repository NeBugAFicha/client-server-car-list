import {NextFunction, Response, Request} from 'express';

export const notFound = (req: Request, res: Response, next: NextFunction)=>next(new Error('Not Found'));