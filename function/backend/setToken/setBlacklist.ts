import { setBlackList } from "../../../types/function/setToken/setBlacklist"
import { Blacklist } from '../../../lib/mongodb/schema/Blacklist'
import { expireAt } from "../expireAt"
import { logger } from "../../../lib/winston"



const setBlacklist: setBlackList<Date> = async ({userId,expiresIn,ip,loginAttempts}) => {
    const promise = new Promise<Date>(async (resolve, reject) => {
        let blockingTimestamps: Date = expireAt(0);
        try{
            if(loginAttempts && loginAttempts >= 5){
        
                blockingTimestamps = expireAt(60 * 15);
                if(loginAttempts >= 7){
                    blockingTimestamps = expireAt(60 * 30);
                }
                if(loginAttempts >= 9){
                    blockingTimestamps  = expireAt(60 * 60);
                }
                logger.info(`user_id:${userId} and ip:${ip} has been block`);

                //There can add some unlock user feature in the future
            }
            
            const result = await Blacklist.findOneAndUpdate(
                { userId,ip },
                { userId, expireAt: expireAt( expiresIn ),blockingTimestamps },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            ) as { expireAt: Date };

            await Blacklist.findOneAndUpdate(
                { userId,ip },
                { $inc: { loginAttempts: 1 } },
            );

            resolve(result.expireAt)

        }
        catch(err){ 
            reject(err)
        }
    })


    return promise;
}

export { setBlacklist }