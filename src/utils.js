import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt"
import passport from "passport"


export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export const createHash=password=>bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const validateHash=(pass, hash)=>bcrypt.compareSync(pass, hash)

/*export const passportCall=strategy=>function (req, res, next) {
    passport.authenticate(strategy, function (err, user, info, status) {
        if (err) { return next(err) } 
        if (!user) {
            return res.status(401).send({error: info.messages?info.messages:info.toString()});
        }  
        req.user=user;
        return next()
    })(req, res, next);
}*/

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({error: info.messages?info.messages:info});
            }
            req.user = user;
            next();
        })(req, res, next);
    }
};
