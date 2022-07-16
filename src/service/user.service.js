import model from "./../model/user.js";
import { getMongooseErrorMessage } from "../utils/error.util.js";

export default class UserService {
  static async findAll() {
    return await model.find({});
  }

  static async findOne(filter) {
    return await model.findOne(filter);
  }

  static async create(user) {
    try {
      return await model.create(user);
    } catch (error) {
      const message = getMongooseErrorMessage(error);
      throw new Error(message || "Erro ao cadastrar usuário");
    }
  }

  static async update(user) {
    try {
      return await model.updateOne({ _id: user._id }, user);
    } catch (error) {
      const message = getMongooseErrorMessage(error);
      throw new Error(message || "Erro ao atualizar usuário");
    }
  }

  static async changePassword(email, newPassword) {
    try {
      return await model.updateOne(
        { email: email },
        { $set: { password: newPassword } }
      );
    } catch (error) {
      const message = getMongooseErrorMessage(error);
      throw new Error(message || "Erro ao atualizar senha do usuário");
    }
  }

  static async remove(id) {
    try {
      return await model.deleteOne({ _id: id });
    } catch (error) {
      throw new Error("Erro ao remover usuário");
    }
  }
}
