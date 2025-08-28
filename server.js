import express from "express";
import db from "./DAO/conexao.js"
import {router as routeUser} from "./routes/routesUsuario.js"
import {router as routeEmp} from "./routes/routesEmpresa.js"
import { router as routeAdmin } from "./routes/routesAdm.js";

const app = express();
app.use(express.json());
app.use("/usuario", routeUser);
app.use("/empresa", routeEmp);
app.use("/admin", routeAdmin);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
