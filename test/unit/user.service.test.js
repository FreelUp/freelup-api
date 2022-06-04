import "dotenv/config"
import { connect, closeDatabase, clearDatabase } from "./../../src/db/test.js"
import service from "./../../src/service/user.service.js";

const user = {
    name: "Jão da Silva",
    email: "jao@gmail.com",
    password: "123"
}

beforeAll(async () => {
    await connect()
})

afterAll(async () => {
    await clearDatabase()
    await closeDatabase()
})

test("Deve retornar todos os usuários cadastrados", async () => {
    const result = await service.findAll()
    expect(result).toHaveProperty("length")
});

test("Deve cadastrar um novo usuário", async () => {
    const result = await service.create(user)
    user._id = result._id
    expect(result).toHaveProperty("_id")
})

test("Deve lançar exceção por email duplicado", async () => {
    await expect(service.create(user))
    .rejects
    .toThrow();
})

test("Deve alterar um usuário já cadastrado", async () => {
    user.name = "Jão da Silva de Oliveira"
    const result = await service.update(user)
    expect(result.modifiedCount).toBe(1)
})

test("Deve lançar exceção por não encontrar o usuário a ser alterado", async () => {
    await expect(service.update({_id: "123456789"}))
    .rejects
    .toThrow()
})

test("Deve remover um usuário já cadastrado", async () => {
    const result = await service.remove(user._id)
    expect(result.deletedCount).toBe(1)
})

test("Deve lançar exceção por não encontrar o usuário a ser removido", async () => {
    await expect(service.remove({_id: "123456789"}))
    .rejects
    .toThrow()
})