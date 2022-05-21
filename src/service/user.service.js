import mongoose from "mongoose"
import model from "./../model/user.js"

export default class UserService {

    static async findAll() {
        try {
            return await model.find({})
        } catch (error) {
            throw {
                message: "Erro ao buscar todos os usuários: " + error.message,
                clientMessage: "Erro ao buscar usuários"
            }
        }
    }

}