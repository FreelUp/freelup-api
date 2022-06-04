import request from "supertest";
import DB from "./../../src/db/index.js";
import { setup } from "./../../src/server.js";
let api;

beforeAll(async () => {
  await DB.connect();
  api = await setup();
});

afterAll(async () => {
  await DB.clearDatabase();
  await DB.closeDatabase();
});

describe("GET /user", () => {
  it("Deve responder com JSON e status 200 contendo um vetor", (done) => {
    request(api)
      .get("/user")
      // .set('token', token)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("length");
        done();
      });
  });
});

describe("POST /user", () => {
  test("Deve responder um JSON status 200 contendo um objeto com a propriedade _id", (done) => {
    request(api)
      .post("/user")
      .send({
        name: "Jão da Silva",
        email: "jao@gmail.com",
        password: "123456",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("_id");
        done();
      });
  });
});
