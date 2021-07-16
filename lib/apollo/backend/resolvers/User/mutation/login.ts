import { compare } from "bcryptjs";
import { setAccessToken, setBlacklist, setRefreshToken, tokenPrefix } from "../../../../../../function/backend/setToken";
import { Context } from "../../../../../../types/apollo/backend/context";
import { UserType } from "../../../../../../types/apollo/backend/schema/UserType"
import { Blacklist } from "../../../../../mongodb/schema/Blacklist";
import { UserToken } from "../../../../../mongodb/schema/Token";
import { User } from "../../../../../mongodb/schema/User";
import { logger } from "../../../../../winston";




const login = async (_: null, args: {email: string, password: string},{setCookie,inComingIp: ip}: Context) => {

            
    const user = await User.findOne({email: args.email}) as UserType;

    if(!user){
        throw new Error("This email does not exist")
    }


    const inBlacklist = await Blacklist.findOne({userId: user.id,ip});

    let loginAttempts;
    if(inBlacklist){
        const { blockingTimestamps } = inBlacklist;
        loginAttempts = inBlacklist.loginAttempts;
        const now = new Date();
        if(now.getTime() < blockingTimestamps.getTime()){ 
            throw new Error("Your account has been blocked, Please try again later");
        }
    }

    const valid = await compare(args.password, user.password);
    if(!valid){
        try{
            await setBlacklist({userId:user.id, expiresIn: 60 * 15,ip,loginAttempts});
        }catch(err){
            logger.error(err);
        }
        throw new Error("Wrong password");
    }
    
    if(!user.confirmed){ 
        throw new Error("Please confirm your email address");
    }


    const loggedInAccessToken = await UserToken.findOne({userId: user.id,type: tokenPrefix.access, ip});
    try{
        let cookies = [];
        const accessTokenCookie = await setAccessToken({
            userId: user.id, 
            expiresIn: 60 * 60 * 24 * 3,
            uid: loggedInAccessToken?.uid || undefined,
            ip,
        });
        cookies.push(accessTokenCookie);
    

        setCookie(cookies);

        const refreshToken = await setRefreshToken({userId: user.id, expiresIn: 60 * 30,ip });  

        if(loginAttempts && loginAttempts > 0){
            await Blacklist.findOneAndDelete({ userId:user.id, ip });
        }
        return {
            user,
            refreshToken
        }

    }catch(err){
        logger.error(err);
        return null

    }


}


export { login }