import { verify } from "jsonwebtoken";
import { tokenPrefix } from "../../../function/backend/setToken";
import { UserTokenType } from "../../../types/apollo/frontend/schema/UserTokenType";
import { forgotPasswordTokenPrefix } from "../../../types/function/setToken/tokenPrefix";
import { UserToken } from "../schema/Token";


type GetForgotPasswordToken = (token: string) => Promise<UserTokenType<forgotPasswordTokenPrefix>>

const getForgotPasswordToken: GetForgotPasswordToken = (token) => {
    const promise = new Promise<UserTokenType<forgotPasswordTokenPrefix>>(async (resolve,reject) => {
        if(!token || token === ""){
            reject(new Error("no forgotPasswordToken provided"));
        }else{
            try{
                const {uid} = verify(token,tokenPrefix.forgotPassword + process.env.EMAIL_SECRET!) as {uid: string};
                if(!uid){
                    reject(new Error("invalid token"));
                }else{
                    const storedToken = await UserToken.findOne({uid,type: tokenPrefix.forgotPassword});
                    if(!storedToken){
                        reject(new Error("invalid token"));
                    }else{
                        resolve(storedToken);
                    }
                }

            }catch(err){
                reject(err)
            }
        }
    });
    return promise
}


export { getForgotPasswordToken }