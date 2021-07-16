import { NextApiResponse } from "next"

interface CookieOptions {
    domain?: string;
    encode?(value: string): string;
    expires?: Date;
    httpOnly?: boolean;
    maxAge?: number;
    path?: string;
    sameSite?: true | false | 'lax' | 'strict' | 'none';
    secure?: boolean;
}
interface Cookie {
    name: string,
    value: any,
    options?: CookieOptions
}
interface Header {
    key: string,
    value: any
}

type SetCookie = (args: (Cookie[] | Cookie)) => void;
type SetCookieWrapper = (res: NextApiResponse ) => SetCookie ;



export type { CookieOptions,Cookie,Header,SetCookie,SetCookieWrapper }