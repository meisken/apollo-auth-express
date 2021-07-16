import mongoose from 'mongoose';
import Cors from 'cors'
import { Request, Response } from 'express';
import { runMiddleware } from "../../middleware/runMiddleware"
import { rateLimiter } from './../../middleware/rate_limiter/rateLimiter';
import { logger } from '../winston';

const cors = Cors({
  methods: ['DELETE'],
  origin: 'http://example.com',
})


type Handler = (req: Request, res: Response) => Promise<void>;


const connectDb = (handler: Handler) => async (req: Request, res: Response) => {

    try{
        await runMiddleware(req, res, cors);
        await rateLimiter({req,res,max:100});
    }catch(err){
        logger.error(err);
        return err
    }

  
    if (mongoose.connections[0].readyState !== 1) {
        try {
            await mongoose.connect( (process.env.MONGODB_URL || "mongodb://192.168.1.100/graphql") , {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            });
        } catch (err) {
            logger.error(err.message);
            process.exit(1);
        }

    }

    return handler(req, res);
};

const db = mongoose.connection;
db.once('open', () => {
    logger.info('MongoDB connected.');
});

export {connectDb};