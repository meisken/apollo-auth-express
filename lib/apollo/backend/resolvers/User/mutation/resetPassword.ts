import { Context } from "../../../../../../types/apollo/backend/context";
import { passwordCheck } from "../../../../../../function/backend/validation/passwordCheck";
import { UserToken } from "../../../../../mongodb/schema/Token";
import { User } from "../../../../../mongodb/schema/User";
import { logoutAll } from "./logoutAll"
import { getForgotPasswordToken } from "../../../../../mongodb/function/getForgotPasswordToken";
import { logger } from "../../../../../winston";

const resetPassword = async (_: null, {token,newPassword}: {token: string, newPassword: string},context: Context) => {
    
    
        
    const storedToken = await getForgotPasswordToken(token);     
    if(!storedToken){
        throw new Error("invalid token");
    }

    const hashedNewPassword = await passwordCheck(newPassword,storedToken.userId);

    try{

        await User.findOneAndUpdate(
            { _id: storedToken.userId} ,
            { password: hashedNewPassword },
            { new: true }
        )
        await UserToken.findByIdAndDelete(storedToken.id);
        await logoutAll(null,null,context);
        return true;
 
    }catch(err){
        logger.error(err);;
        return false
    }
}


export { resetPassword }