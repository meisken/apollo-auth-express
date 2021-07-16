import { Request } from 'express';
type GetIp = (req: Request) => string 


export const getIp: GetIp = (req) => {
    const forwarded = req.headers['x-forwarded-for'] as string;
    let ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress as string;
    if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7)
    }

    
    return ip
}