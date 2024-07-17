const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para analisar o corpo das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint para receber os dados do formulário
app.post('/api/register', (req, res) => {
    const data = req.body;

    // Carregar dados existentes
    const filePath = path.join(__dirname, 'data.json');
    let existingData = [];

    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath);
        existingData = JSON.parse(fileData);
    }

    // Adicionar os novos dados
    existingData.push(data);

    // Salvar os dados atualizados
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    res.status(200).json({ message: 'Dados salvos com sucesso!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
