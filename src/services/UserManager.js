import userModel from "../models/user.model.js";

export class UserManager{
    static async getBy(filter={}){
        return await userModel.findOne(filter).lean()
    }

    static async addUser(user={}){
        let newUser=await userModel.create(user)
        return newUser.toJSON()
    }
}