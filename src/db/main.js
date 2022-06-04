import mongoose from "mongoose";
const DB_URL = process.env.DB_URL;

export default class DB {
  static async connect() {
    try {
      const connection = await mongoose.connect(DB_URL);
      return connection;
    } catch (error) {
      throw {
        message: "Falha ao connectar no DB: " + error.message,
      };
    }
  }
}
