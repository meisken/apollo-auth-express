import { setTokenFunction } from "../../../types/function/setToken/setTokenType"
import { tokenPrefix } from "./tokenPrefix"
import { UserToken } from '../../../lib/mongodb/schema/Token'
import { v4 as uuidv4 } from 'uuid';
import { expireAt } from "../expireAt"
import { sign } from "jsonwebtoken"



const setConfirmationToken: setTokenFunction<string> = async ({userId,expiresIn}) => {
    const promise = new Promise<string>(async (resolve, reject) => {

        try{
            const {uid} = await UserToken.findOneAndUpdate(
                { userId, type: tokenPrefix.confirmation },
                { userId, uid: tokenPrefix.confirmation + uuidv4(), expireAt: expireAt( expiresIn ), type: tokenPrefix.confirmation },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            ) as { uid: string };
            const confirmationToken = sign({uid}, tokenPrefix.confirmation + process.env.EMAIL_SECRET! , {expiresIn});
            resolve(confirmationToken)
        }
        catch(err){ 
            reject(err)
        }
    })


    return promise;
}

export { setConfirmationToken }