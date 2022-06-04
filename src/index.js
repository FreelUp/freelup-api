import "dotenv/config";
import DB from "./db/index.js";
import { setup } from "./server.js";
const PORT = process.env.PORT;
let api;

async function init() {
  try {
    await DB.connect();
    console.log("Banco de dados conectado com sucesso");
    api = await setup();
    api.listen(PORT, () => {
      console.log(`API rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

init()