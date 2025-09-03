// Importações
import express from "express";
import session from "express-session";
import { engine } from "express-handlebars";
import db from "./DAO/conexao.js"
import path from "path";
import { fileURLToPath } from "url";

// Rotas externas
import Trabalhador_Route from "./routes/TrabalhadorRoutes.js";
import Empresa_Route from "./routes/EmpresaRoutes.js";
import Login_Route from "./routes/loginRoutes.js"

// Controllers de login

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ===== Configuração do Handlebars =====
app.engine("hbs", engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// ===== Arquivos estáticos =====
app.use(express.static(path.join(__dirname, "public")));

// ===== Parser para form =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Configuração de sessão =====
app.use(
  session({
    secret: "b7f8c2e1d9a4f6e3b2c1a8d7e6f5c4b3",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 30 } // 30 minutos
  })
);

app.engine("hbs", engine({ 
  extname: ".hbs",
  defaultLayout: "main",
  helpers: {
    eq: (a, b) => a === b
  }
}));
app.set("view engine", "hbs");


// ===== Rotas POST para processar login =====
app.use("/login", Login_Route);

// ===== Rotas de cadastro externas =====
app.use("/cadastro/trabalhador", Trabalhador_Route);
app.use("/empresa", Empresa_Route);

// Redireciona raiz para cadastro do trabalhador
app.get("/", (req, res) => {
  res.redirect("cadastro/trabalhador/informacoes-pessoais");
});

// Página home (após login, por exemplo)
app.get("/home", (req, res) => {
  if (!req.session.usuarioLogado) {
    return res.redirect("/login/trabalhador");
  }
  res.render("home", { usuario: req.session.usuarioLogado });
});


// ===== Inicia servidor =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
