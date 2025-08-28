//1 - Importando módulos externos.
import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";

//2 - Importando módulos internos.
//Routes
import usuarioRoutes from "./routes/routesUsuario.js";

//3 - Configurando servidor
const app = express();


//4 - Middlewares
/*
    4.1 - Configura o servidor para entender objetos JSON;
    4.2 - Configura o servidor para entender objetos aninhados; 
    4.3 - Configura a pasta "public" para rodar os arquivos estáticos.
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));





//5 - Link das rotas
app.use("/usuarios", usuarioRoutes);





//0 - Configurando porta.
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
