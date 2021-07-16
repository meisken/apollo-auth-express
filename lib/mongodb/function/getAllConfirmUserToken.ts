import { tokenPrefix } from "../../../function/backend/setToken";
import { UserTokenType } from "../../../types/apollo/frontend/schema/UserTokenType";
import { confirmationTokenPrefix } from "../../../types/function/setToken/tokenPrefix";
import { UserToken } from "../schema/Token";

type GetAllConfirmUserToken = () => Promise<UserTokenType<confirmationTokenPrefix>[]>

const getAllConfirmUserToken: GetAllConfirmUserToken = () => {
    const promise = new Promise<UserTokenType<confirmationTokenPrefix>[]>(async (resolve,reject) => {
        try{
            const result = await UserToken.find({type: tokenPrefix.confirmation});
            if(!result){
                reject(new Error("No confirm tokens found"));
            }else{
                resolve(result);
            }
        }catch(err){
            reject(err)
        }
    });
    return promise
}


export { getAllConfirmUserToken }