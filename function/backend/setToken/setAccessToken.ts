import { Cookie } from "../../../types/cookieTypes"
import { setTokenFunction } from "../../../types/function/setToken/setTokenType"
import { tokenPrefix } from "./tokenPrefix"
import { cookiesConfig } from "../cookie/cookiesConfig"
import { UserToken } from '../../../lib/mongodb/schema/Token'
import { v4 as uuidv4 } from 'uuid';
import { expireAt } from "../expireAt"
import { sign } from "jsonwebtoken"

const setAccessToken: setTokenFunction<Cookie> = async ({userId,expiresIn,uid,ip}) => {
    const promise = new Promise<Cookie>(async (resolve, reject) => {
        let uuid: string = uid || tokenPrefix.access + uuidv4() ;


        try{
            const accessToken = await UserToken.findOneAndUpdate(
                { userId, type: tokenPrefix.access, ip }, 
                { uid: uuid , expireAt: expireAt( expiresIn ), type: tokenPrefix.access, ip },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            )
            if(!accessToken){
                reject(new Error("Access token not found"));
                return
            }

            
            const accessJwtToken = sign({uid: accessToken.uid},tokenPrefix.access + process.env.SECRET, {expiresIn: expiresIn});
            const accessTokenCookie: Cookie  = {
                name: "access-token",
                value: accessJwtToken,
                options: {
                    ...cookiesConfig,
                    maxAge: expiresIn
                }
            }
            resolve(accessTokenCookie);
        }
        catch(err){ 
            reject(err);
        }
    })


    return promise;
}

export { setAccessToken }