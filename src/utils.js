import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt"
import passport from "passport"


export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const validateHash = (pass, hash) => bcrypt.compareSync(pass, hash)
export const validaJWT=token=>jwt.verify(token, config.SECRET)
export const generateId= ()=> Date.now().toString(30)+Math.random().toString(30).substring(2)


export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy,{session:false}, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({ error: info.message ? info.message : info.toString() });
            }
            req.user = user;
            next();
        })(req, res, next);
    }
};
