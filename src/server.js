import express from "express";
import cors from "cors";
import { connect } from "./db.js";
import userRouter from "./router/user.router.js";

const api = new express();

async function setup() {
  api.use(cors());
  api.use(express.json());
  api.use("/user", userRouter);

  await dbConnection();
  console.log("DB conectado com sucesso");

  api.get("/", (req, res) => {
    res.send("FreelUp API");
  });
}

async function dbConnection() {
  try {
    await connect();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

setup();
export default api;
