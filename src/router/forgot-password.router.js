import express from "express";
import service from "./../service/user.service.js";
import { sendForgotPasswordEmail } from "../utils/email.util.js";

const router = new express.Router();

router.post("/", async (req, res) => {
  try {
    const userFound = await service.findOne({ email: req.body.email });
    if (!userFound)
      return res.status(400).json({ message: "Usuário não encontrado" });
    if (!userFound.active)
      return res.status(400).json({ message: "Usuário está inativado" });
    await sendForgotPasswordEmail(userFound.email)
    res.json({ message: "Email de redefinição de senha enviado com sucesso" });
  } catch (error) {
    console.log(error.message);
    res.status(error.status || 500).json({ message: error.message });
  }
});

export default router;
