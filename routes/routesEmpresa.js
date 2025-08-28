import { Router } from "express";
import {
    listarEmpresas,
    criarEmpresa,
    loginEmpresa
} from "../controllers/controllersEmpresas.js";

const router = Router();

router.get("/", listarEmpresas);        // GET /empresa
router.post("/", criarEmpresa);         // POST /empresa
router.post("/login", loginEmpresa);    // POST /empresa/login

export { router };
