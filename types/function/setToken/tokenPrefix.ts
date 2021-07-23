

type accessTokenPrefix =  "access-token";
type refreshTokenPrefix =  "refresh-token";
type confirmationTokenPrefix =  "confirmation";
type forgotPasswordTokenPrefix =  "forgot-password";
type unlockTokenPrefix =  "unlock";
interface TokenPrefix{
    access: accessTokenPrefix,
    refresh: refreshTokenPrefix,
    confirmation: confirmationTokenPrefix,
    forgotPassword: forgotPasswordTokenPrefix,
    unlock: unlockTokenPrefix
}
type TokenEnum = accessTokenPrefix | refreshTokenPrefix | confirmationTokenPrefix| forgotPasswordTokenPrefix | unlockTokenPrefix;
export type { TokenPrefix,TokenEnum,accessTokenPrefix,confirmationTokenPrefix,forgotPasswordTokenPrefix,refreshTokenPrefix,unlockTokenPrefix }