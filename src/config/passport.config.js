import passport from "passport"
import local from "passport-local"
import github from "passport-github2"
import passportJWT from "passport-jwt"
import { UsersService } from "../services/users.services.js"
import { createHash, validateHash } from "../utils.js"
import { config } from "./config.js"
import { cartsService } from "../services/carts.service.js"
import UserDTO  from "../dto/dto.user.js"




const getToken = req => {
    let token = null;

    if (req.cookies.tokenCookie) {
        token = req.cookies.tokenCookie
    }
   
    return token
}

export const inicializePassport = () => {


    passport.use('register',
        new local.Strategy(
            {
                passReqToCallback: true,
                usernameField: "email"
            },
            async (req, username, password, done) => {
                try {
                    const { first_name, last_name, age } = req.body
                    if (!first_name || !last_name || !age) {
                        return done(null, false, { message: `Complete todos los datos` })
                    }
                    const exist = await UsersService.getByfiltro({ email: username })
                    if (exist) {
                        return done(null, false, { message: `Ya existe un usuario registrado con este email: ${username}` })
                    }
                   const cart= await cartsService.createCart()
                    password = createHash(password)

                    let user = await UsersService.addUser({ first_name: first_name, last_name: last_name, email: username, age: age, password: password, cart: cart })
                    delete user.password
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )


    passport.use("login",
        new local.Strategy(
            {
                usernameField: "email"
            },
            async (username, password, done) => {
                try {
                    const user = await UsersService.getByfiltro({ email: username })
                    if (!user) {
                        return done(null, false, {message: "Usuario o contraseña inválidos"})
                    }
                    if (!validateHash(password, user.password)) {
                        return done(null, false, {message: "Usuario o contraseña inválidos"})
                    }
                    delete user.password
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use("github",
        new github.Strategy(
            {
                clientID:config.CLIENT_ID,
                clientSecret:config.CLIENT_SECRET,
                callbackURL: "http://localhost:8080/api/sessions/callbackGithub"
            },
            async (token, rt, profile, done) => {
                try {
                    const { name, email } = profile._json

                    if (!name || !email) {

                        return done(null, false, { message: `La cuenta de Github no permite acceso a información relevante para la creación de la cuenta` })
                    }

                    let user = await UsersService.getByfiltro({ email })

                    if (!user) {
                        user = await UsersService.addUser({ first_name: name, email: email })
                    }
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )


    passport.use("current",
        new passportJWT.Strategy(
            {
                secretOrKey: config.SECRET,
                jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([getToken])
            },
            async (user, done) => {
                try {
                    if (!user) {
                        return done(null, false)
                    }
                    const userDto= new UserDTO(user)
                    return done(null, userDto)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )




}