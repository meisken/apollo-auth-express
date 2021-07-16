
import { setTokenFunction } from "../../../types/function/setToken/setTokenType"
import { tokenPrefix } from "./tokenPrefix"
import { UserToken } from '../../../lib/mongodb/schema/Token'
import { v4 as uuidv4 } from 'uuid';
import { expireAt } from "../expireAt"
import { sign } from "jsonwebtoken"

const setForgotPasswordToken: setTokenFunction<string> = ({expiresIn,userId}) => {
    const promise = new Promise<string>(async (resolve, reject) => {

        try{
            const {uid} = await UserToken.findOneAndUpdate(
                { userId, type: tokenPrefix.forgotPassword }, 
                { uid: tokenPrefix.forgotPassword + uuidv4(), expireAt: expireAt( expiresIn ), type: tokenPrefix.forgotPassword },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            ) as { uid: string };
            const forgotPasswordToken = sign({uid}, tokenPrefix.forgotPassword + process.env.EMAIL_SECRET! , {expiresIn});
            resolve(forgotPasswordToken);
        }
        catch(err){ 
            reject(err)
        }
    })

    return promise;
}

export { setForgotPasswordToken }