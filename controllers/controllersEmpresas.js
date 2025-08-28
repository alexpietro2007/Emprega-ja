import db from "../DAO/conexao.js";

// listar todas as empresas
export const listarEmpresas = (req, res) => {
    db.query("SELECT * FROM tbEmpresa", (err, results) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(results);
    });
};

// criar empresa usando procedure
export const criarEmpresa = (req, res) => {
    const {
        nomeEmpresa,
        cnpjEmpresa,
        setorEmpresa,
        emailEmpresa,
        telefoneEmpresa,
        logoEmpresa,
        siteEmpresa,
        senhaEmpresa
    } = req.body;

    db.query(
        "CALL spInserirEmpresa(?, ?, ?, ?, ?, ?, ?, ?)", // procedure
        [nomeEmpresa, cnpjEmpresa, setorEmpresa, emailEmpresa, telefoneEmpresa, logoEmpresa, siteEmpresa, senhaEmpresa],
        (err, results) => {
            if (err) return res.status(500).json({ erro: err.message });
            res.status(201).json({ mensagem: "Empresa criada com sucesso!" });
        }
    );
};

// login da empresa usando procedure
export const loginEmpresa = (req, res) => {
    const { email, senha } = req.body;

    db.query(
        "CALL spLoginEmpresa(?, ?)", // procedure de login
        [email, senha],
        (err, results) => {
            if (err) return res.status(500).json({ erro: err.message });

            const empresa = results[0][0]; // results[0] = tabela retornada da procedure
            if (!empresa) return res.status(401).json({ erro: "Email ou senha incorretos" });

            res.json(empresa);
        }
    );
};
