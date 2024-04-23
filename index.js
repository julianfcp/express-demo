import config from 'config';
import express from "express";
import logger from "./middlewares/logger.js";
import helmet from "helmet";
import morgan from "morgan";
import debug from 'debug';
import router from './routes/index.js';

const app = express();

//Configuration
console.log("config: ", config.get('name'))
console.log("config: ", config.get('mail.host'))
//console.log("config: ", config.get('mail.password'))

//templating engine
app.set('view engine', 'pug');
app.set('views', './views') // default

//Debug  - set export DEBUG=app:startup to debug
const startupDebugger = debug('app:startup');
startupDebugger(`Debugging here....`);

//environments
// needs to export <variable>=<valor> on terminal
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log("Morgan enabled...")
}

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //key=value&key=value => req.body
app.use(express.static('public'));
app.use(helmet());
//Routes
app.use('/', router)

//custom middlewares
app.use(logger);

//createServer
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

