const express = require('express');
const db = require('./database/db.js');

const app = express();
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  db.query('SELECT NOW() AS data_hora', (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.json(results[0]);
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
