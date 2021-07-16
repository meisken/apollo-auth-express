import { verify } from "jsonwebtoken";
import { tokenPrefix } from "../../../../../../function/backend/setToken";
import { passwordCheck } from "../../../../../../function/backend/validation/passwordCheck";
import { usernameCheck } from "../../../../../../function/backend/validation/usernameCheck";
import { Context } from "../../../../../../types/apollo/backend/context";
import { UserToken } from "../../../../../mongodb/schema/Token";
import { User } from "../../../../../mongodb/schema/User";
import { logger } from "../../../../../winston";
import { logoutAll } from "./logoutAll"

interface UpdateUserInfoArgs{
    refreshToken: string
    username: string,
    password: string
}


const updateUserInfo = async (_: null, {refreshToken,username,password}:UpdateUserInfoArgs,context: Context) => {
    const { inComingIp } = context;

    // basic info checking
    if(!refreshToken){
        throw new Error("Login please");
    }
    const {uid} = verify(refreshToken,tokenPrefix.refresh + process.env.SECRET) as {uid: string};
 
    if(!uid){
        throw new Error("Login please");
    }
    if(!username && !password){
        throw new Error("There's no any new user Information");
    }

    if(username && username !== ""){
        await usernameCheck(username);
    }


    //advance info checking and push the info to newUser
    let userId: string, newUser: any = {};
    const isPasswordChanged = password && password !== "";
    try{
        const userToken = await UserToken.findOne({uid,type: tokenPrefix.refresh,ip: inComingIp});
        userId = userToken.userId;
        
    }catch(err){
        logger.error(err);
        throw(new Error("invalid token"));
    }

    if(username && username !== ""){
        newUser.username = username
    }
    if(isPasswordChanged){
        const hashedPassword = await passwordCheck(password,userId);
        newUser.password = hashedPassword;
    }

    //save new data
    try{
        
        const updatedUser = await User.findByIdAndUpdate(
            {_id: userId},
            newUser,
            {new: true}
        )
        if(!updatedUser){
            throw new Error("User not found");
        }
        if(isPasswordChanged){
            logoutAll(null,null,context);
        }

        return updatedUser



    }catch(err){
        logger.error(err);
        return null
        
    }
}

export { updateUserInfo }