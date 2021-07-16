import { sendMail } from "../../../../../nodemailer/sendMail";
import { setForgotPasswordToken } from "../../../../../../function/backend/setToken";
import { User } from "../../../../../mongodb/schema/User";
import { logger } from "../../../../../winston";


const forgotPassword = async (_: null, {email}: {email: string}) => {
    try{
        const user = await User.findOne({email});
        if(!user){
            throw new Error("User was not found");
        }
        const token = await setForgotPasswordToken({userId: user.id,expiresIn: 60 * 10});
        const sendMailResult = await sendMail({email,token,temple:"forgot-password"});
        logger.info(JSON.stringify(sendMailResult));
        return true
        
    }catch(err){
        logger.error(err);
        return false
    }
}


export {forgotPassword}