import "dotenv/config"
import api from "./server.js"
const PORT = process.env.PORT

api.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
})