import { Router } from "express";
import multer from "multer";
import { 
  CT_CadastroEmpresa_Controller, 
  CT_CadastroEmpresa_DE_Controller, 
  CT_LoginEmpresa_View, 
  CT_LoginEmpresa_Auth 
} from "../controllers/EmpresaController.js";

const router = Router();

// Configuração do multer para upload de logo
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/LOGOS"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Cadastro da empresa
router.post("/cadastro", upload.single("logo"), CT_CadastroEmpresa_DE_Controller);
router.get("/cadastro", CT_CadastroEmpresa_Controller);

// Login da empresa
router.get("/login", CT_LoginEmpresa_View);   // exibe o formulário
router.post("/login", CT_LoginEmpresa_Auth);  // processa a autenticação

export default router;
