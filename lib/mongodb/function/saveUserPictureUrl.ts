import { User } from "../schema/User";


type SaveUserPictureUrl = ({filename,userId}: {filename: string,userId: string}) => Promise<String>
const saveUserPictureUrl: SaveUserPictureUrl = ({filename,userId}) => {
    const promise = new Promise<string>(async (resolve,reject) => {

        try{

            const user = await User.findByIdAndUpdate(
                userId,
                { pictureUrl: filename },
                { new: true }
            ) as { pictureUrl: string };
          
            if(!user){
                throw new Error ("User not found");
            }
            
            resolve(user.pictureUrl)
        }catch(err){
            reject(err)
        }
    })
    return promise
}

export {saveUserPictureUrl}