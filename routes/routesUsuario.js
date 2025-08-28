import { Router } from "express";
import {
    listarUsuarios,
    criarUsuario,
    loginUsuario
} from "../controllers/controllersUsuario.js";

const router = Router();

router.get("/", listarUsuarios);        // GET /usuario
router.post("/", criarUsuario);         // POST /usuario
router.post("/login", loginUsuario);    // POST /usuario/login

export { router }; // export nomeado
