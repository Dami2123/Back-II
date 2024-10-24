import express from 'express'
import { passportCall } from '../utils.js';
import jwt from "jsonwebtoken"
import { config } from '../config/config.js';
import passport from 'passport';




const router = express.Router()

router.post("/register", passportCall("register"),
    (req, res) => {
        try {
            if (!req.user) {
                return res.status(400).json({ payload: req.message })
            }
            return res.status(200).json({ payload: `Registro exitoso para ${req.user.first_name} ${req.user.last_name}`, user: req.user })

        } catch (error) {
            return res.status(500).send({ status: "error", error: error });
        }
    }
)

router.post("/login", passportCall("login"),
    (req, res) => {

        try {
            if (!req.user) {
                return res.status(400).json({ payload: "Usuario o contraseña inválido" })
            }

            const token = jwt.sign(req.user, config.SECRET, { expiresIn: 3600 })
            res.cookie("tokenCookie", token, { httpOnly: true })

            return res.status(200).json({ payload: `Login exitoso para ${req.user.first_name} ${req.user.last_name}`, user: req.user });

        } catch (error) {
            return res.status(500).send({ status: "error", error: error });
        }


    });

router.get("/current", passportCall("current"),
    (req, res) => {

        try {
            if (!req.user) {
                return res.status(400).json({ payload: "No existe ningún usuario logeado" })
            }
            return res.status(200).json({ payload: `Usuario ${req.user.email} logeado`, user: req.user });

        } catch (error) {
            return res.status(500).send({ status: "error", error: error });
        }

    });

router.get('/github', passportCall("github")
)

router.get("/callbackGithub", passportCall("github"),
    (req, res) => {

        try {
            const token = jwt.sign(req.user, config.SECRET, { expiresIn: 3600 })
            res.cookie("tokenCookie", token, { httpOnly: true })

            return res.status(200).json({ payload: "Login exitoso", usuarioLogueado: req.user });

        } catch (error) {
            return res.status(500).send({ error: error });
        }


    }
)




export default router;