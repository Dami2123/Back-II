import express from 'express'
import { passportCall } from '../utils.js';
import jwt from "jsonwebtoken"
import { config } from '../config/config.js';
import passport from 'passport';
import { auth } from '../middleware/auth.js';
import { sessionLogin, sessionRegister,sessionsLogout, sessionsCurrent,sessionsGithub } from '../controller/sessions.controller.js';


const router = express.Router()

router.post("/register", passportCall("register"), sessionRegister)

router.post("/login", passportCall("login"),sessionLogin);


router.get("/logout", passportCall("current"), sessionsLogout);
    

router.get("/current", passportCall("current"),sessionsCurrent);


router.get('/github', passportCall("github")
)

router.get("/callbackGithub", passportCall("github"),sessionsGithub )


export default router;