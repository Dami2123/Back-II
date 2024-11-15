import dotenv from "dotenv"

dotenv.config({
    path:"./src/.env", override:true
})

export const config={
    PORT: process.env.PORT || 8080,
    MONGO_URL: process.env.MONGO_URL,
    SECRET: process.env.SECRET
}