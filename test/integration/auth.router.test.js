import request from "supertest";
import DB from "./../../src/db/index.js";
import { setup } from "./../../src/server.js";
import service from "./../../src/service/user.service.js";
let api;

beforeAll(async () => {
  await DB.connect();
  api = await setup();
  await service.create({
    name: "Jão da Silva",
    email: "jao@gmail.com",
    password: "123456",
  });
  await service.create({
    name: "Zé da Silva",
    email: "ze@gmail.com",
    password: "123456",
    active: false,
  });
});

afterAll(async () => {
  await DB.clearDatabase();
  await DB.closeDatabase();
});

describe("POST /auth", () => {
  test("Deve responder um JSON status 200 contendo um token", (done) => {
    request(api)
      .post("/auth")
      .send({
        email: "jao@gmail.com",
        password: "123456",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("token");
        done();
      });
  });

  test("Deve responder um JSON status 403 usuário inativado", (done) => {
    request(api)
      .post("/auth")
      .send({
        email: "ze@gmail.com",
        password: "123456",
      })
      .expect("Content-Type", /json/)
      .expect(403)
      .then((response) => {
        expect(response.body.message).toBe("Usuário inativado");
        done();
      });
  });

  test("Deve responder um JSON status 404", (done) => {
    request(api)
      .post("/auth")
      .send({
        email: "asdfasdf@gmail.com",
        password: "asdfasdffasdf",
      })
      .expect("Content-Type", /json/)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Usuário não encontrado");
        done();
      });
  });
});