import "dotenv/config"
import { connect } from "./../../src/db.js"
import service from "./../../src/service/user.service.js";

beforeAll(async () => {
    await connect()
})

test("Deve retornar todos os usuários cadastrados", async () => {
    const result = await service.findAll()
    expect(result).toHaveProperty("length")
});
