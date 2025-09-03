import db from "../DAO/conexao.js";

// ================== ETAPA 1 ==================
export const CT_InfoPessoais_Controller = (req, res) => {
  res.render("CT_infoPessoais"); // Tela 1
};

export const CT_InfoPessoais_DE_Controller = (req, res) => {
  const { nome, cpf, dataNasc, sexo } = req.body;
  req.session.trabalhador = { nome, cpf, dataNasc, sexo }; // armazenar na sessão
  res.redirect("/cadastro/trabalhador/informacoes-contato");
};

// ================== ETAPA 2 ==================
export const CT_InfoContato_Controller = (req, res) => {
  res.render("CT_infoContato"); // Tela 2
};

export const CT_InfoContato_DE_Controller = (req, res) => {
  const { email, telefone } = req.body;
  req.session.trabalhador = { ...req.session.trabalhador, email, telefone };
  res.redirect("/cadastro/trabalhador/foto-perfil");
};

// ================== ETAPA 3 ==================
export const CT_FotoPerfil_Controller = (req, res) => {
  res.render("CT_FotoPerfil"); // Tela 3
};

export const CT_FotoPerfil_DE_Controller = (req, res) => {
  // O multer salva o arquivo em req.file
  const fotoPath = req.file ? `/IMG/${req.file.filename}` : null;
  req.session.trabalhador = { ...req.session.trabalhador, foto: fotoPath };
  res.redirect("/cadastro/trabalhador/senha");
};

// ================== ETAPA 4 ==================
export const CT_Senha_Controller = (req, res) => {
  res.render("CT_Senha"); // Tela 4
};

export const CT_Senha_DE_Controller = (req, res) => {
  const { senha, confirmarSenha } = req.body;

  if (senha !== confirmarSenha) {
    return res.render("CT_Senha", { erro: "As senhas não coincidem" });
  }

  if (!req.session.trabalhador) {
    return res.render("CT_Senha", { erro: "Sessão expirada ou dados incompletos. Por favor, preencha todas as etapas do cadastro." });
  }

  const { nome, cpf, dataNasc, sexo, email, telefone, foto } = req.session.trabalhador;

  db.query(
    "CALL spCadastrarUsuario(?, ?, ?, ?, ?, ?, ?, ?)",
    [nome, cpf, dataNasc, sexo, foto, email, telefone, senha],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao cadastrar usuário.");
      }

      req.session.trabalhador = null; // limpa sessão
      res.redirect("/cadastro/trabalhador/login");
    }
  );
};

// ================== LOGIN ==================
export const CT_LoginTrabalhador_Controller = (req, res) => {
  res.render("login", {
    usuario: "trabalhador",
    nome_campo_chave: "Email",
    tipo_campo: "text",
    link_cadastro: "/trabalhador/cadastro",
    texto_cadastro: "Quero me cadastrar como trabalhador",
    erro_login: req.query.erro || null
  });
};

export const CT_LoginTrabalhador_DE_Controller = (req, res) => {
  const { email, senha } = req.body;

  db.query(
    "CALL spLoginUsuario(?, ?)",
    [email, senha],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao realizar login.");
      }

      const usuario = results[0][0];

      if (usuario) {
        req.session.trabalhadorLogado = usuario;
        res.redirect("/home");
      } else {
        res.render("login", { erro: "Email ou senha inválidos" });
      }
    }
  );
};
