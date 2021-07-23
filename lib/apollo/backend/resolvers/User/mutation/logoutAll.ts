import { deleteAccessTokenCookie, tokenPrefix } from "../../../../../../function/backend/setToken";
import { ApolloContextType } from "../../../../../../types/apollo/backend/context";
import { UserToken } from "../../../../../mongodb/schema/Token";
import { logger } from "../../../../../winston";



const logoutAll = async (_: null, _args: null, { user,setCookie }: ApolloContextType) => {
    if(!user){
        return false
    }
    try{
        await UserToken.deleteMany({userId: user.id, type: tokenPrefix.access});
        await UserToken.deleteMany({userId: user.id, type: tokenPrefix.refresh});
        deleteAccessTokenCookie(setCookie);
        
        return true

    }catch(err){
        logger.error(err);
        return false
    }


}

export { logoutAll }