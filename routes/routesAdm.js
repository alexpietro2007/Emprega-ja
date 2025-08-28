import { Router } from "express";
import { loginAdmin } from "../controllers/controllersAdm.js";

const router = Router();

router.post("/login", loginAdmin);   // POST /admin/login

export { router };
