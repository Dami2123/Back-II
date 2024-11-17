import userModel from "./models/user.model.js";

export  class UsersDao{
    
    static async getBy(filter){
        return await userModel.findOne(filter).lean()
    }

    static async create(user){
        return await userModel.create(user)
    }

}