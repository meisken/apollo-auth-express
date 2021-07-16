import { getForgotPasswordToken } from "../../../../../mongodb/function/getForgotPasswordToken";
import { logger } from "../../../../../winston";


const isValidForgotPasswordToken = async (_: null, {forgotPasswordToken}: {forgotPasswordToken: string}) => {
    if(!forgotPasswordToken){
        return false
    }else{
        try{
            const storedToken = await getForgotPasswordToken(forgotPasswordToken);
            if(!storedToken){
                return false
            }else{
                return true
            }
        }catch(err){
            logger.error(err);
            return false
        }        
    }
}

export { isValidForgotPasswordToken }