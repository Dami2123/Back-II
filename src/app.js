import express from 'express'
import { engine } from 'express-handlebars'
import { __dirname} from './utils.js'
import { config } from './config/config.js'
import { Server } from 'socket.io'
import mongoose from 'mongoose';
import { inicializePassport } from './config/passport.config.js'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import sessionsRouter from './routes/sessions.router.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewRouter from './routes/views.router.js'
import { ConnDB } from './ConnDB.js';


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
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewRouter)



const httpServer = app.listen(config.PORT, () => {
    console.log("Servidor escuchando por el puerto: " + config.PORT);
});


await ConnDB.onConnection(config.MONGO_URL)



