import db from "../DAO/conexao.js";

// listar usuários
export const listarUsuarios = (req, res) => {
    db.query("SELECT * FROM tbUsuario", (err, results) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(results);
    });
};

// criar usuário usando procedure
export const criarUsuario = (req, res) => {
    const { nomeUsuario, cpfUsuario, dataNascUsuario, sexoUsuario, fotoUsuario, emailUsuario, telefoneUsuario, senhaUsuario } = req.body;

    db.query(
        "CALL spInserirUsuario(?, ?, ?, ?, ?, ?, ?, ?)",
        [nomeUsuario, cpfUsuario, dataNascUsuario, sexoUsuario, fotoUsuario, emailUsuario, telefoneUsuario, senhaUsuario],
        (err, results) => {
            if (err) return res.status(500).json({ erro: err.message });
            res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
        }
    );
};

// login de usuário usando procedure
export const loginUsuario = (req, res) => {
    const { email, senha } = req.body;

    db.query(
        "CALL spLoginUsuario(?, ?)",
        [email, senha],
        (err, results) => {
            if (err) return res.status(500).json({ erro: err.message });
            const usuario = results[0][0]; // results[0] = tabela retornada da procedure
            if (!usuario) return res.status(401).json({ erro: "Email ou senha incorretos" });
            res.json(usuario);
        }
    );
};
