const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'mysql-empregaja.alwaysdata.net',
  user: 'empregaja',
  password: 'trinity.inova2025',
  database: 'empregaja_trinity'
});

// Testar conexão
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL com sucesso!');
});

module.exports = db;
