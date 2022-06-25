import express from "express";
import service from "./../service/user.service.js";
import { verify } from "../middleware/auth.middleware.js";

const router = new express.Router();

router.get("/", verify, async (req, res) => {
  try {
    res.json(await service.findAll());
  } catch (error) {
    console.log(error.message);
    res.status(error.status || 500).json({ message: error.clientMessage });
  }
});

router.post("/", async (req, res) => {
  try {
    res.json(await service.create(req.body));
  } catch (error) {
    console.log(error.message);
    res.status(error.status || 500).json({ message: error.clientMessage });
  }
});

export default router;
