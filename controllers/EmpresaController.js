import db from "../DAO/conexao.js";

// Renderiza tela de cadastro
export const CT_CadastroEmpresa_Controller = (req, res) => {
  res.render("cadastroEmpresa"); // sua view .hbs
};

// Processa cadastro
export const CT_CadastroEmpresa_DE_Controller = (req, res) => {
  const { nome, cnpj, setor, email, telefone, site, senha } = req.body;
  const logo = req.file ? `/LOGOS/${req.file.filename}` : null;

  db.query(
    "CALL spCadastrarEmpresa(?, ?, ?, ?, ?, ?, ?, ?)",
    [nome, cnpj, setor, email, telefone, logo, site, senha],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao cadastrar empresa.");
      }
      // Depois do cadastro, vai para tela de login da empresa
      res.redirect("/home");
    }
  );
};

// Renderiza tela de login
export const CT_LoginEmpresa_View = (req, res) => {
  res.render("login", {
    usuario: "empresa",
    nome_campo_chave: "CNPJ ou Email",
    tipo_campo: "text",
    link_cadastro: "/empresa/cadastro",
    texto_cadastro: "Quero me cadastrar como empresa",
    erro_login: req.query.erro || null
  });
};

// Processa login
export const CT_LoginEmpresa_Auth = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.redirect("/empresa/login?erro=Preencha todos os campos");
  }

  db.query(
    "CALL spLoginEmpresa(?, ?)", // 🔹 Procedure própria para empresa
    [email, senha],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao realizar login.");
      }

      const empresa = results[0][0]; // primeiro registro retornado

      if (empresa) {
        req.session.empresaLogada = empresa;
        res.redirect("/home");
      } else {
        res.redirect("/empresa/login?erro=Email ou senha inválidos");
      }
    }
  );
};
