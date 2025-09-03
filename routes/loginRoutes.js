import { Router } from "express";
import { CT_Login_Controller, CT_Login_DE_Controller } from "../controllers/loginControllers.js";

const router = Router();

// GET → exibe tela de login
router.get("/:tipo", CT_Login_Controller);

// POST → processa login
router.post("/:tipo", CT_Login_DE_Controller);

export default router;
