import { verify } from "jsonwebtoken";
import { tokenPrefix } from "../../../function/backend/setToken";
import { UserType } from "../../../types/apollo/backend/schema/UserType"
import { UserToken } from "../schema/Token";
import { User } from "../schema/User";


interface Args{
    inComingIp: string,
    accessToken: string
}

type GetUserWithAccessToken = ({inComingIp,accessToken}: Args) => Promise<UserType>


const getUserWithAccessToken: GetUserWithAccessToken = ({accessToken,inComingIp}) => {
    const promise = new Promise<UserType>(async (resolve,reject) => {
 
        const { uid } = verify(accessToken, tokenPrefix.access + process.env.SECRET!) as { uid: string };
        if(!uid){
            reject(new Error("invalid token, please login again"));
            return
        }

        try{
            const parsedToken = await UserToken.findOne({uid,type: tokenPrefix.access,ip: inComingIp});      
            if(!parsedToken){
                reject(new Error("invalid token, please login again"));
            }else if(inComingIp === parsedToken.ip){
                const user = await User.findById(parsedToken.userId);   
                if(user){
                    user.accessTokenIp = parsedToken.ip;
                    resolve(user);
                    return
                }else{
                    reject("invalid token, please login again")
                }
                
            }else{
                reject(new Error("invalid token, please login again"));
            }



        }catch(err){
            reject(err);
        }
  

    });
    return promise
}



export { getUserWithAccessToken }