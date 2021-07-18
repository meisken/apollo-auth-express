import { verify } from "jsonwebtoken";
import { tokenPrefix } from "../../../function/backend/setToken";
import { UserType } from "../../../types/apollo/backend/schema/UserType";
import { UserToken } from "../schema/Token";
import { User } from "../schema/User";



type GetUserByRefreshToken = ({token,inComingIp}:{token:string,inComingIp: string}) => Promise<UserType>
const getUserByRefreshToken: GetUserByRefreshToken = ({token,inComingIp}) => {
    const promise = new Promise<UserType>(async (resolve,reject) => {
        try{
            const decodedToken = verify(token,tokenPrefix.refresh + process.env.SECRET) as {uid: string};
            if(decodedToken){
                const userToken = await UserToken.findOne({uid:decodedToken.uid,type: tokenPrefix.refresh, ip: inComingIp}) as {userId: string};
                if(userToken){
                    const user = await User.findById(userToken.userId);
                    user ? resolve(user) : reject(new Error ("User not found"));
                
                }else{
                    reject(new Error ("Invalid user token"));    
               
                }
            }else{
                reject(new Error ("Invalid user token"));   
            }

   
        
        }catch(err){
            reject(err);
        }
    });
    return promise
}


export {  getUserByRefreshToken }