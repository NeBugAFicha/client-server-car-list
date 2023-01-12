const start = Date.now();
import express from 'express';
import cors from 'cors';
import { notFound }  from './middlewares/notFound';
import { response } from './middlewares/response';
import { Routers } from './Routers';
import * as controllers from './controllers';
import mongoose from 'mongoose';
import { config } from './config';

const app = express();
const {routers} = new Routers(controllers);

app.use(cors());
app.use(express.json());

for(const router of routers){
    app.use(router);
}

app.use(notFound);
app.use(response);

const {MONGO_URL, PORT, mongoOptions} = config;

app.listen(PORT, async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(MONGO_URL, mongoOptions);
    } catch (err) {
        console.error('Server starting error:', {message: err.message});
        process.exit(1);
    }
    console.info(`Server start listening (startup time: ${Date.now() - start}ms)`, {PORT});
});
  
  process.on('uncaughtException', (error: Error) => {
      console.error('Uncaught Exception!', error.message);
      process.exit(1);
  });
