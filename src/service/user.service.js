import mongoose from "mongoose"
import model from "./../model/user.js"

export default class UserService {

    static async findAll() {
        return await model.find({})
    }

    static async findOne(filter) {
        return await model.findOne(filter)
    }

    static async create(user) {
        try {
            return await model.create(user)
        } catch (error) {
            throw new Error("Erro ao cadastrar usuário")
        }
    }

    static async update(user) {
        try {
            return await model.updateOne({ _id: user._id }, user)
        } catch (error) {
            throw new Error("Erro ao atualizar usuário")
        }
    }

    static async remove(id) {
        try {
            return await model.deleteOne({ _id: id })
        } catch (error) {
            throw new Error("Erro ao remover usuário")
        }
    }

}