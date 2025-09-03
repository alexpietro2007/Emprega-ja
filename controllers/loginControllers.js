import db from "../DAO/conexao.js";

// Exibir tela de login
export const CT_Login_Controller = (req, res) => {
  const { tipo } = req.params;

  let config = {};
  if (tipo === "trabalhador") {
    config = {
      usuario: "trabalhador",
      nome_campo_chave: "Email",
      tipo_campo: "email",
      link_cadastro: "/cadastro/trabalhador/informacoes-pessoais",
      texto_cadastro: "Quero me cadastrar como trabalhador"
    };
  } else if (tipo === "empresa") {
    config = {
      usuario: "empresa",
      nome_campo_chave: "Email",
      tipo_campo: "email",
      link_cadastro: "/empresa/cadastro",
      texto_cadastro: "Cadastrar minha empresa"
    };
  } else if (tipo === "admin") {
    config = {
      usuario: "admin",
      nome_campo_chave: "Login",
      tipo_campo: "text",
      link_cadastro: null,
      texto_cadastro: null
    };
  } else {
    return res.status(404).send("Tipo de login inválido");
  }

  res.render("login", { ...config, erro_login: req.query.erro || null });
};

// Processar login
export const CT_Login_DE_Controller = (req, res) => {
  const { tipo } = req.params;
  const { email, senha } = req.body;

  let procedure = "";
  if (tipo === "trabalhador") procedure = "CALL spLoginUsuario(?, ?)";
  else if (tipo === "empresa") procedure = "CALL spLoginEmpresa(?, ?)";
  else if (tipo === "admin") procedure = "CALL spLoginAdmin(?, ?)";
  else return res.status(404).send("Tipo de login inválido");

  db.query(procedure, [email, senha], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao realizar login.");
    }

    const usuario = results[0][0];

    if (usuario) {
      // Salva sessão com tipo e dados do usuário
      req.session.usuarioLogado = { tipo, ...usuario };
      return res.redirect("/home");
    }

    // Login inválido → volta para a tela de login
    res.redirect(`/login/${tipo}?erro=Credenciais inválidas`);
  });
};
