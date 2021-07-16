import { setTokenFunction } from "../../../types/function/setToken/setTokenType"
import { tokenPrefix } from "./tokenPrefix"
import { UserToken } from '../../../lib/mongodb/schema/Token'
import { v4 as uuidv4 } from 'uuid';
import { expireAt } from "../expireAt"
import { sign } from "jsonwebtoken"

const setRefreshToken: setTokenFunction<string> = async ({userId,expiresIn,ip}) => {
    const promise = new Promise<string>(async (resolve, reject) => {

        try{
            const refreshToken = await UserToken.findOneAndUpdate(
                { userId, type: tokenPrefix.refresh, ip }, 
                { uid: tokenPrefix.refresh + uuidv4(), expireAt: expireAt( expiresIn ), type: tokenPrefix.refresh,ip },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            )
            const refreshJwtToken = sign({uid: refreshToken.uid},tokenPrefix.refresh + process.env.SECRET, {expiresIn});
            resolve(refreshJwtToken)
        }
        catch(err){ 
            reject(err)
        }
    })


    return promise;
}

export { setRefreshToken }
