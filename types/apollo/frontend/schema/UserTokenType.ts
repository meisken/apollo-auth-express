
interface UserTokenType<T>{
    id: string,
    userId: string,
    ip: string | undefined,
    type: T,
    expireAt: Date
} 


export type { UserTokenType }