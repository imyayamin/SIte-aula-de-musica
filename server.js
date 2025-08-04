const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Usuario = require('./models/Usuario');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Conecte ao MongoDB Atlas
mongoose.connect('mongodb+srv://user1:uX1Vqtzuqy6aWFVt@sitemidi.v9gywrm.mongodb.net/?retryWrites=true&w=majority&appName=SiteMIDI');

// Rota de cadastro
app.post('/api/cadastro', async (req, res) => {
  const { email, senha } = req.body;
  const existe = await Usuario.findOne({ email });
  if (existe) return res.status(400).json({ erro: 'Usuário já existe' });
  const novo = new Usuario({ email, senha });
  await novo.save();
  res.json({ sucesso: true });
});

// Rota de login
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ email, senha });
  if (!usuario) return res.status(401).json({ erro: 'Credenciais inválidas' });
  res.json({ sucesso: true });
});

const port = 3000;

app.listen(port, () => console.log('Servidor rodando na porta 3000'));