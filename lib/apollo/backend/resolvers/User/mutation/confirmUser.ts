import { verify } from "jsonwebtoken";
import { tokenPrefix } from "../../../../../../function/backend/setToken";
import { UserToken } from "../../../../../mongodb/schema/Token";
import { User } from "../../../../../mongodb/schema/User";
import { logger } from "../../../../../winston";



const confirmUser = async (_: null, {token}: {token: string}) => {
          
    try{
        const validToken = verify(token, tokenPrefix.confirmation + process.env.EMAIL_SECRET! ) as {uid: string};
        if(!validToken){
            return false
        }
        const userToken = await UserToken.findOne({uid: validToken.uid,type: tokenPrefix.confirmation});
        if(!userToken){
            return false
        }
        const user = await User.findById( userToken.userId);
        if(!user){
            return false
        }
        await UserToken.findOneAndDelete({_id: userToken.tokenId})
        if(user.confirmed){
            throw new Error("Your account has been activated");
        }
        await User.updateOne({_id: user.id},{ confirmed: true });
        return true
    }catch(err){
        logger.error(err);
        return false
    }

}

export { confirmUser }