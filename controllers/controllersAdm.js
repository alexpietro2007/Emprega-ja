import db from "../DAO/conexao.js";

// login de administrador
export const loginAdmin = (req, res) => {
    const { loginAdmin, senhaAdmin } = req.body;

    db.query(
        "CALL spLoginAdmin(?, ?)", // procedure de login do admin
        [loginAdmin, senhaAdmin],
        (err, results) => {
            if (err) return res.status(500).json({ erro: err.message });

            const admin = results[0][0]; // pega o registro retornado
            if (!admin) return res.status(401).json({ erro: "Login ou senha incorretos" });

            res.json(admin);
        }
    );
};
