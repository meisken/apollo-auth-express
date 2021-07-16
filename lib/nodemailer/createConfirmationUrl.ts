import { sign } from "jsonwebtoken"

export const createConfirmationUrl = (userId: string) => {
 
    if(userId){
        const token = sign({userId},process.env.SECRET as any, {expiresIn: 60 * 15});
        return token
    }else{
        console.log("please provide a userId");
        return null
    }
}

