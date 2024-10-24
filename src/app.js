import express from 'express'
import { engine } from 'express-handlebars'
import viewRouter from './routes/views.router.js'
import { __dirname} from './utils.js'
import { config } from './config/config.js'
import { Server } from 'socket.io'
import mongoose from 'mongoose';
import { inicializePassport } from './config/passport.config.js'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import sessionsRouter from './routes/sessions.router.js'


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine());
app.set('views', __dirname + '/views/');
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public/'))

app.use(cookieParser())

inicializePassport()
app.use(passport.initialize())

// Routers
app.use("/api/sessions", sessionsRouter)
app.use('/', viewRouter)


const httpServer = app.listen(config.PORT, () => {
    console.log("Servidor escuchando por el puerto: " + config.PORT);
});


const connectMongoDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URL)
        console.log('connected to DB ecommerce')
    } catch (error) {
        console.log(error);
    }
};

connectMongoDB()

