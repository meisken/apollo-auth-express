import { deleteAccessTokenCookie } from "../../../../../../function/backend/setToken/deleteAccessTokenCookie";
import { Context } from "../../../../../../types/apollo/backend/context";
import { getUserWithAccessToken } from "../../../../../mongodb/function/getUserWithAccessToken";
import { logger } from "../../../../../winston";


const isLoggedIn = async (_: null, {accessToken,ip}: {accessToken: string,ip: string}, { setCookie,user }:Context ) => {
    
    

    if(user && user.confirmed ){
        return user
    }

    if(!accessToken){
        return null
    }
    try{
        user = await getUserWithAccessToken({inComingIp: ip,accessToken});
        if(user){
            return user
        }else{
            deleteAccessTokenCookie(setCookie);
            return null
        }
    }catch(err){
        logger.error(err);
        return null
        
    }

}

export { isLoggedIn }