import { sendMail } from "../../../../../nodemailer/sendMail";
import { setConfirmationToken } from "../../../../../../function/backend/setToken";
import { passwordCheck } from "../../../../../../function/backend/validation/passwordCheck";
import { User } from "../../../../../mongodb/schema/User";
import { usernameCheck } from "../../../../../../function/backend/validation/usernameCheck";
import { logger } from "../../../../../winston";

const register = async (_: null, args: {username: string, email: string, password: string}) => {
    const { email,username,password } = args;
  
    const hashedPassword = await passwordCheck(password);
    await usernameCheck(username);
    let user = new User({email,username,password: hashedPassword,admin: false, confirmed: false,pictureUrl: "" });
    try{
        const savedUser = await user.save();
        const confirmationToken = await setConfirmationToken({userId: savedUser.id,expiresIn:60 * 15});
        const sendMailResult = await sendMail({email,token:confirmationToken,temple:"confirm"});

        
        logger.info(JSON.stringify(sendMailResult));

        return true;
    }catch(err){
        console.log(err);
        if(err.code === 11000){
            throw new Error("The email address has been registered");
        }
        logger.error(err);
        return false
    }


}

export { register }