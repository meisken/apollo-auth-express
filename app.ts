import express from 'express'
require('dotenv').config();
import cors from "cors"
import { logger } from './lib/winston';
import mongoose from "mongoose"
import { limiter } from "./lib/rateLimit/rateLimiter"
import { corsConfig } from './lib/cors/corsConfig';
import { apolloServer } from "./lib/apollo/backend/ApolloServer"

const app = express();
const port = 3005;



mongoose.connect( process.env.MONGODB_URL! , {       
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
} as any);
mongoose.connection.once('open', () => {
    logger.info('connected to database');
});





app.use(limiter);

app.use(cors(corsConfig));

app.use(express.static("public"));

apolloServer.applyMiddleware({app,cors:false});

app.listen({ port }, () => {
    console.log("server running on port:" + port);
})

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// })
