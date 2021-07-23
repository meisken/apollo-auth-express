import { passwordCheck } from "../../../../../../function/backend/validation/passwordCheck";
import { usernameCheck } from "../../../../../../function/backend/validation/usernameCheck";
import { ApolloContextType } from "../../../../../../types/apollo/backend/context";
import { File } from "../../../../../../types/file/uploadType";
import { uploadFile } from "../../../../../fs/uploadFile";
import { getUserWithRefreshToken } from "../../../../../mongodb/function/getUserWithRefreshToken";
import { User } from "../../../../../mongodb/schema/User";
import { logger } from "../../../../../winston";
import { logoutAll } from "./logoutAll"
import { removeFiles } from './../../../../../fs/removeFiles';


interface UpdateUserInfoArgs{
    refreshToken: string
    username: string,
    password: string,
    file: File
}


const updateUserInfo = async (_: null, {refreshToken,username,password,file}:UpdateUserInfoArgs,context: ApolloContextType) => {
    const { inComingIp } = context;
    let userId: string, newUser: any = {},oldPictureUrl;
    // basic info checking
    if(!refreshToken){
        throw new Error("Login please");
    }
    try{
        const { id,pictureUrl } = await getUserWithRefreshToken({token: refreshToken,inComingIp});
        userId = id;
        oldPictureUrl = pictureUrl;
        
    }catch(err){
        throw(err);
    }

    if(!username && !password && !file){
        throw new Error("There's no any new user Information");
    }

    if(username && username !== ""){
        await usernameCheck(username);
        newUser.username = username
    }


    //advance info checking and push the info to newUser

    const isPasswordChanged = password && password !== "";


    if(isPasswordChanged){
        const hashedPassword = await passwordCheck(password,userId);
        newUser.password = hashedPassword;
    }

    //save new data

    try{
        if(file){
            const destinationFolder = "uploads/img/";
            const filenames = await uploadFile(file,{fileType:"image",maxCount: 2,maxSize:5,destinationFolder: `public/${destinationFolder}`});
            console.log(filenames);
            
            const newPictureUrl = `${destinationFolder + filenames[0]}`
            newUser.pictureUrl = newPictureUrl; 

            if(oldPictureUrl && newPictureUrl !== oldPictureUrl){
                removeFiles("public/" + oldPictureUrl);
            }
        }
    }catch(err){
        throw err
    }
    
    try{
      
        const updatedUser = await User.findByIdAndUpdate(
            {_id: userId},
            newUser,
            {new: true}
        )
        if(!updatedUser){
            throw new Error("User not found");
        }
        if(isPasswordChanged){
            logoutAll(null,null,context);
        }

        return updatedUser



    }catch(err){
        logger.error(err);
        return null
        
    }
    
}

export { updateUserInfo }