import {createTransport,SendMailOptions} from "nodemailer"

interface Args{
    email: string,
    token: string,
    temple: "forgot-password" | "confirm" | "unlock",

}

const emailAddressFrom = "meiskenmailservice@gmail.com";

const sendMail = async ({email,token,temple = "confirm"}: Args) => {

    let transporter = createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: process.env.EMAIL_USER!,
            pass: process.env.EMAIL_PASSWORD!
        }
    })

    
    const url = `${process.env.BASE_URL}/user/${temple}/${token}`;

    
    let mailOptions: SendMailOptions = {};
  

    if(temple === "confirm"){
 
        mailOptions = {
            from: emailAddressFrom ,
            to: email,
            subject: "Testing",
            html: `
                <a href="${url}">Confirm your mail</a>
            `
        }
    }

    if(temple === "forgot-password"){

        mailOptions = {
            from: emailAddressFrom ,
            to: email,
            subject: "Testing",
            html: `<a href="${url}">Reset your password</a>`
        }
    }
    if(temple === "unlock"){

        mailOptions = {
            from: emailAddressFrom ,
            to: email,
            subject: "Testing",
            html: `
                <div>
                    Hi user,

                    Your account is locked due to too many failed login attempts. 
                    If you want to unlock immediately please click the down below, 
                    <a href="${url}">Unlock your account</a>

                    best,
                    Ken Tang
                </div>
            `
        }
    }


    return transporter.sendMail(mailOptions);

   
    
}


export  { sendMail } 