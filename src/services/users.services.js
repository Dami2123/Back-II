import { UsersDao as users } from "../dao/users.dao.js"

export class UsersService{
    
    static async getByfiltro(filter={}){
        return await users.getBy(filter)
    }

    static async addUser(user={}){
        const newUser=await users.create(user)
        return newUser.toJSON()
    }
}
