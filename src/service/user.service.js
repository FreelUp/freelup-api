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

    static async create(user) {
        try {
            return await model.create(user)
        } catch (error) {
            throw {
                message: "Erro ao cadastrar usuário: " + error.message,
                clientMessage: "Erro ao cadastrar usuário"
            }
        }
    }

    static async update(user) {
        try {
            return await model.updateOne({ _id: user._id }, user)
        } catch (error) {
            throw {
                message: "Erro ao atualizar usuário: " + error.message,
                clientMessage: "Erro ao atualizar usuário"
            }
        }
    }

    static async remove(id) {
        try {
            return await model.deleteOne({ _id: id })
        } catch (error) {
            throw {
                message: "Erro ao remover usuário: " + error.message,
                clientMessage: "Erro ao remover usuário"
            }
        }
    }

}