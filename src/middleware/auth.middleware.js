import UserService from "./../service/user.service.js";
import { decode } from "../utils/token.util.js";

export async function verify(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({ message: "O token precisa ser informado" });
    }

    const user = decode(token);
    const userFound = await UserService.findOne({ _id: user._id });

    if (!userFound) {
      res.status(404).json({ message: "Usuário não encontrado" });
    } else if (!userFound.active) {
      res.status(401).json({ message: "Usuário está inativado" });
    }

    next();
  } catch (error) {
    res.status(400).json({ message: "Token informado inválido" });
  }
}
