import { hash,compare } from "bcryptjs";
import { User } from "../../../lib/mongodb/schema/User";
import { hasNumber } from "../../both/hasNumber";
import { onlyNumber } from "../../both/onlyNumber";



type PasswordCheck = (password: string,userId?: string) => Promise<string>;
const passwordCheck: PasswordCheck = async (password,userId) => {

    const promise = new Promise<string>(async (resolve,reject) => {
    
        if(!hasNumber(password) || onlyNumber(password)){
            reject(new Error("The password must contains numbers and characters"))
        }else if(password.length < 6){
            reject(new Error("Minimum password length is 6 characters"))
        }else{
            const hashedNewPassword = await hash(password,12);
            if(userId){
                try{
              
                    const {password: oldPassword} = await User.findById(userId);
                    const IsOldPassword = await compare(password, oldPassword);
                    if(IsOldPassword){
                        reject(new Error("new password cannot be the same as old"));
                    }else{
                        resolve(hashedNewPassword);
                    }
                }catch(err){
                    reject(err);
                
                }
            }else{
                resolve(hashedNewPassword);
            }
        }


    })
    return promise

}

export { passwordCheck }