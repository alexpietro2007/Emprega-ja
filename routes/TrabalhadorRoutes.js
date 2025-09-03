import { Router } from "express";
import multer from "multer";
import {
  CT_InfoPessoais_Controller,
  CT_InfoPessoais_DE_Controller,
  CT_InfoContato_Controller,
  CT_InfoContato_DE_Controller,
  CT_FotoPerfil_Controller,
  CT_FotoPerfil_DE_Controller,
  CT_Senha_Controller,
  CT_Senha_DE_Controller,
  CT_LoginTrabalhador_Controller,
  CT_LoginTrabalhador_DE_Controller
} from "../controllers/TrabalhadorController.js";

const router = Router();

// Configuração do multer para salvar arquivos na pasta 'public/IMG'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/IMG");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// ================== ETAPA 1 ==================
router.get("/informacoes-pessoais", CT_InfoPessoais_Controller);
router.post("/dados-enviados/informacoes-pessoais", CT_InfoPessoais_DE_Controller);

// ================== ETAPA 2 ==================
router.get("/informacoes-contato", CT_InfoContato_Controller);
router.post("/dados-enviados/informacoes-contato", CT_InfoContato_DE_Controller);

// ================== ETAPA 3 ==================
router.get("/foto-perfil", CT_FotoPerfil_Controller);
router.post("/dados-enviados/foto-perfil", upload.single("foto"), CT_FotoPerfil_DE_Controller);

// ================== ETAPA 4 ==================
router.get("/senha", CT_Senha_Controller);
router.post("/dados-enviados/senha", CT_Senha_DE_Controller);

// ================== LOGIN ==================
// LOGIN DO TRABALHADOR
router.get("/login", CT_LoginTrabalhador_Controller);
router.post("/login", CT_LoginTrabalhador_DE_Controller);


export default router;
