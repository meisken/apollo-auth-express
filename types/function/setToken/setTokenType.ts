
interface SetTokenArgs{
    userId: string,
    expiresIn: number,
    uid?: string,
    ip?: string
}
type setTokenFunction<T> = ({}: SetTokenArgs) => Promise<T>;

export type { setTokenFunction,SetTokenArgs }
