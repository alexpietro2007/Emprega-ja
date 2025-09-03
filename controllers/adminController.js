export const CT_LoginAdmin_Controller = (req, res) => {
  res.render("login", {
    usuario: "admin",
    nome_campo_chave: "Login",
    tipo_campo: "text",
    link_cadastro: null,
    texto_cadastro: null,
    erro_login: req.query.erro || null
  });
};

export const CT_LoginTrabalhador_DE_Controller = (req, res) => {
    const { email, senha } = req.body;

    db.query(
        "CALL spLoginAdmin(?, ?)",
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