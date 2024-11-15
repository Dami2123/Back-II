import passport from "passport"
import local from "passport-local"
import github from "passport-github2"
import passportJWT from "passport-jwt"
import { UsersService } from "../services/users.service.js"
import { createHash, validateHash } from "../utils.js"
import { config } from "./config.js"




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

                    password = createHash(password)

                    let user = await UserManager.addUser({ first_name: first_name, last_name: last_name, email: username, age: age, password: password })
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
                    const user = await UsersService.getBy({ email: username })
                    if (!user) {
                        return done(null, false)
                    }
                    if (!validateHash(password, user.password)) {
                        return done(null, false)
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
                clientID: "Iv23lii0luBD7xQGGPmv",
                clientSecret: "d328f35d5787745ffbb394e4c7b86ec1d3f4a447",
                callbackURL: "http://localhost:8080/api/sessions/callbackGithub"
            },
            async (token, rt, profile, done) => {
                try {
                    const { name, email } = profile._json

                    if (!name || !email) {

                        return done(null, false, { message: `La cuenta de Github no permite acceso a información relevante para la creación de la cuenta` })
                    }

                    let user = await UsersService.getBy({ email })

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
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )




}