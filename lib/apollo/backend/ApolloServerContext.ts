import { Request,Response } from 'express';
import { getCookie } from '../../../function/backend/cookie/getCookie';
import { setCookie } from '../../../function/backend/cookie/setCookie';
import { getIp } from '../../../function/backend/getIp';
import { ApolloContextType } from '../../../types/apollo/backend/context';
import { UserType } from '../../../types/apollo/backend/schema/UserType';
import { getUserWithAccessToken } from '../../mongodb/function/getUserWithAccessToken';
import { logger } from '../../winston/index';

type Context = ({ req,res }: {req: Request, res: Response  }) => Promise<ApolloContextType>;
const context: Context = async ({ req,res }) => {

    const inComingIp = getIp(req);
    //const acceptReqHeader = req.headers.accept;
    // if(acceptReqHeader !== "accept-request"){
    //     logger.info(`invalid accept header from ip:${inComingIp}`);
    //     throw new Error("something wrong");
    // }
    
    let user: UserType | undefined;
    const accessToken = req.headers.cookie ? getCookie(req.headers.cookie,"access-token") : undefined;

    
    

    if(accessToken){
        try{
            user = await getUserWithAccessToken({inComingIp,accessToken});
        }catch(err){
            user = undefined;
            
        }
    }


    return { 
        req,
        res,
        user,
        inComingIp,
        setCookie: setCookie(res), 
    };
}

export { context }