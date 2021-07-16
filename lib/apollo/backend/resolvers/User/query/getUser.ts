import { Context } from "../../../../../../types/apollo/backend/context";
import { User } from "../../../../../mongodb/schema/User";

const getUser = (_: null, args: {id: String},{user}: Context) => {
    if(user?.admin){
        const { id } = args;
        return User.findById(id);
    }
    return null
}
//If you want it be more security, use refresh token base instead role base
export { getUser }