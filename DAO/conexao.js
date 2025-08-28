import mysql from "mysql2";

const db = mysql.createConnection({
  host: "mysql-empregaja.alwaysdata.net",
  user: "empregaja",
  password: "trinity.inova2025",
  database: "empregaja_trinity",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Erro ao conectar no MySQL:", err);
    return;
  }
  console.log("✅ Conectado ao MySQL!");
});

export default db;
