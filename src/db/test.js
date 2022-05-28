import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

let mongod
let uri
let connection

export async function connect() {
    try {
        mongod = await MongoMemoryServer.create() // Cria o DB em memória
        uri = mongod.getUri()
        connection = await mongoose.connect(uri)
        return connection
    } catch (error) {
        throw {
            message: "Falha ao connectar no DB: " + error.message
        }
    }
}

export async function closeDatabase() {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
}

export async function clearDatabase() {
    const collections = mongoose.connection.collections
    for(const key in collections) {
        await collections[key].deleteMany()
    }
}