import express from "express";
import service from "./../service/user.service.js";
import { encode } from "../utils/token.util.js";

const router = new express.Router();

router.post("/", async (req, res) => {
  try {
    const result = await service.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!result) {
      throw {
        message: "Usuário não encontrado",
        clientMessage: "Usuário não encontrado",
        status: 404,
      };
    } else if (!result.active) {
      throw {
        message: "Usuário inativado",
        clientMessage: "Usuário inativado",
        status: 403,
      };
    } else {
      const token = encode({
        name: result.name,
        email: result.email,
        _id: result._id,
      });
      res.json({
        _id: result._id,
        name: result.name,
        email: result.email,
        token: token,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(error.status || 500).json({ message: error.clientMessage });
  }
});

export default router;
