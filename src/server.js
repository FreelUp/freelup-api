import express from "express";
import cors from "cors";
import userRouter from "./router/user.router.js";
import authRouter from "./router/auth.router.js";
import forgotPasswordRouter from "./router/forgot-password.router.js";

export async function setup() {
  const api = new express();
  api.use(cors());
  api.use(express.json());
  api.use("/user", userRouter);
  api.use("/auth", authRouter);
  api.use("/forgot-password", forgotPasswordRouter);

  api.get("/", (req, res) => {
    res.send("FreelUp API");
  });

  return api;
}
