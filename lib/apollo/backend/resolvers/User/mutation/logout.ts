import { deleteAccessTokenCookie, tokenPrefix } from "../../../../../../function/backend/setToken";
import { ApolloContextType } from "../../../../../../types/apollo/backend/context";
import { UserToken } from "../../../../../mongodb/schema/Token";
import { logger } from "../../../../../winston";



const logout = async (_: null, _args: null, { setCookie,user }: ApolloContextType) => {

    deleteAccessTokenCookie(setCookie);
    if(user){
        try{
            await UserToken.findOneAndDelete({userId: user.id, type: tokenPrefix.access,ip: user.accessTokenIp});
            await UserToken.findOneAndDelete({userId: user.id, type: tokenPrefix.refresh,ip: user.accessTokenIp});
        }catch(err){
            logger.error(err);
        }
      
    }
    return true
}

export { logout }