interface SetBlackListArgs{
    userId: string,
    expiresIn: number,
    ip: string,
    loginAttempts?: number

}
type setBlackList<T> = ({}:  SetBlackListArgs) => Promise<T>
export type { SetBlackListArgs,setBlackList }