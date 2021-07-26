import cors from "cors";

const corsConfig: cors.CorsOptions = {
    methods:["GET","POST"],
    origin:(origin,callback) => {
        let allowedOrigins = process.env.ALLOWED_ORIGINS!.split(",");

        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            let msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
        
    },
    
    credentials: true
}



export { corsConfig }