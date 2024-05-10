const express = require('express');
const validator = require('./utils/validator')
const app = express();

app.use(express.json()); // Para suportar requisições com corpo JSON
app.use(express.urlencoded({ extended: false })); // Para suportar dados de formulários

// Rota para formatar CPF
app.post('/format-cpf', (req, res) => {
  try {
    const { cpf } = req.body; // Obtem o CPF do body da request
    const cpfFormatado = validador.formatterCPF(cpf); // Formatar CPF
    res.status(200).json({ cpfFormatado }); // Retornar CPF formatado
  } catch (error) {
    res.status(400).json({ error: error.message }); // Retornar erro se CPF for inválido
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serviço rodando na porta --> ${PORT}`);
});