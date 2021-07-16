import { Request,Response } from 'express';
import { SetCookie } from '../../cookieTypes';
import { UserType } from './schema/UserType';
interface Context {
    req: Request,
    res: Response,
    user: UserType | undefined,
    setCookie: SetCookie,
    inComingIp: string
};

export type { Context }

