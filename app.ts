import express from 'express'
require('dotenv').config();
const app = express();
const port = 3005;
import cors from "cors"
import { logger } from './lib/winston';




import mongoose from "mongoose"
mongoose.connect( process.env.MONGODB_URL! , {       
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
} as any);
mongoose.connection.once('open', () => {
    logger.info('connected to database');
});




import { limiter } from "./lib/rateLimit/rateLimiter"
app.use(limiter);



app.use(cors({
    methods:["GET","POST"],
    origin:"*"
}));
app.use(express.static("public"));


import { apolloServer } from "./lib/apollo/backend/ApolloServer"
apolloServer.applyMiddleware({app});



app.listen({ port }, () => {
    console.log("server running on port:" + port);
})

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// })
