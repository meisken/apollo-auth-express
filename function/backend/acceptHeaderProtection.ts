
import { Request,Response,NextFunction } from 'express';
import { logger } from '../../lib/winston';
import { getIp } from './getIp';

type AcceptHeaderProtection = (req:Request,res:Response,next: NextFunction) => void;
const acceptHeaderProtection: AcceptHeaderProtection = (req, res, next) => {
    
    if(req.headers.accept === "accept-request" || process.env.NODE_ENV === "development"){
        next();
    }else{
        const inComingIp = getIp(req);
        logger.info(`invalid accept header from ip:${inComingIp}`);
        return
    }
}


export { acceptHeaderProtection }