import passport from "passport"
import local from "passport-local"
import github from "passport-github2"
import passportJWT from "passport-jwt"
import { UserManager} from "../services/UserManager.js"
import { createHash, validateHash  } from "../utils.js"
import { config } from "./config.js"



const getToken=req=>{
    let token=null;

    if(req.cookies.tokenCookie){
        token=req.cookies.tokenCookie
    }    
    return token
}

export const inicializePassport=()=>{


    passport.use('register', 
        new local.Strategy(
            {
                passReqToCallback: true, 
                usernameField: "email"
            },
            async(req, username, password, done)=>{
                try {
                    const {first_name,last_name, age}=req.body
                    if(!first_name || !last_name|| !age){
                        return done(null, false, {message:`Complete todos los datos`})
                    }
                    const exist=await UserManager.getBy({email:username})
                    if(exist){
                        return done(null, false, {message:`Ya existe un usuario registrado con este email: ${username}`})
                    }

                    password=createHash(password)

                    let user=await UserManager.addUser({first_name: first_name, last_name: last_name, email: username, age: age, password: password})
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
                usernameField:"email"
            },
            async(username, password, done)=>{
                try {
                    const user= await UserManager.getBy({email:username})
                    if(!user){
                        return done(null, false)
                    }
                    if(!validateHash(password, user.password)){
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
                clientID:"Iv23lii0luBD7xQGGPmv",
                clientSecret:"d328f35d5787745ffbb394e4c7b86ec1d3f4a447",
                callbackURL:"http://localhost:8080/api/sessions/callbackGithub"
            },
            async (token, rt, profile, done)=>{
                try {
                    // console.log(profile)
                    let {name, email}=profile._json
                    if(!name || !email){
                        return done(null, false)
                    }

                    let user=await UserManager.getUserBy({email})
                    if(!user){
                        user=await UserManager.addUser({nombre: name, email, profileGithub: profile})
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
            async(user, done)=>{
                try {
                    if(!user){
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