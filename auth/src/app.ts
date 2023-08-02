import cors from "cors";
import express, { Application } from "express";
import log from "./logger";
import http from 'http';
import router from "./routes";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware";

const port = 5001;
const app: Application = express();
const corsOptions = {
  // credentials: true,
  // // origin: `${process.env.SITE_HOSTNAME}${process.env.SITE_PORT !== '80' ? ':' + process.env.SITE_PORT : ''}`,
  // origin: [
  //   `${process.env.SITE_HOSTNAME}${process.env.SITE_PORT !== '80' ? ':' + process.env.SITE_PORT : ''}`,
  //   `${process.env.SITE_HOSTNAME}${process.env.SITE_PORT !== '80' ? ':' + 8082 : ''}`,
  // ],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/auth/', router);
app.use('/assets', express.static(__dirname + '/assets'));
app.use(errorMiddleware);

app.set('port', port);


const onError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') throw error;
  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      log.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = async (): Promise<void> => {
  log.info(`listening on port ${port}!`);
  log.info(`PROD mode is ${process.env.NODE_ENV === 'production' ? 'ON' : 'OFF'}`);
  log.info(`CACHE: ${process.env['DISABLE_CACHE'] === 'true' ? 'disabled' : 'enabled'}`);

  mongoose.connect('mongodb://mongo:27017', {
    socketTimeoutMS: 10,
    user: 'root',
    pass: 'example',
    dbName: 'local'
  }).then(() => {
    log.info("Successfully connected to the DB");
  })
  .catch((e) => {
    log.error(JSON.stringify(e));
  });
  
  // log.info(`DB connected!`);
  // Connect to DB
//   db.authenticate()
//     .then(async () => {

//       log.info('database connected');
//     })
//     .catch((e: any) => {
//       log.error(e.message);
//     });

  // Connect to Redis
//   cache
//     .connect()
//     .then(() => log.info('cache connected'))
//     .catch((e: Error) => log.error(e.message));
};

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

process.on('uncaughtException', (err) => {
  log.error(err && err.stack);
});
